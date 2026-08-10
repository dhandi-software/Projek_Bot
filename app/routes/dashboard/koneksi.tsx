import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useAuth } from "~/hooks/useAuth";
import { useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { TextField } from "~/components/ui/TextField";
import { AuthAlert } from "~/components/ui/AuthAlert";

export default function Koneksi() {
    const { isAuthenticated, isLoading } = useAuth();

    // States for WhatsApp
    const [qrString, setQrString] = useState<string>("");
    const [isWaLoggedIn, setIsWaLoggedIn] = useState<boolean>(false);
    const [waError, setWaError] = useState<string>("");

    // States for Config
    const [spreadsheetId, setSpreadsheetId] = useState("");
    const [configStatus, setConfigStatus] = useState<{type: "success"|"error"|null, message: string}>({type: null, message: ""});
    const [isSaving, setIsSaving] = useState(false);



    // WA QR Polling
    useEffect(() => {
        if (!isAuthenticated) return;

        const interval = setInterval(async () => {
            try {
                const statusRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/wa/status`, {
                    cache: "no-store"
                });
                const statusData = await statusRes.json();

                if (statusData.is_logged_in) {
                    setIsWaLoggedIn(true);
                    clearInterval(interval);
                    return;
                }

                const qrRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/wa/qr`, {
                    cache: "no-store"
                });
                const qrData = await qrRes.json();
                
                if (qrData.qr && qrData.qr !== qrString) {
                    setQrString(qrData.qr);
                }
            } catch (err) {
                console.error("Gagal menghubungi server WA:", err);
                setWaError("Tidak dapat terhubung ke Backend Bot.");
            }
        }, 3000);

        // Initial fetch
        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/wa/status`).then(res => res.json()).then(data => {
            if (data.is_logged_in) setIsWaLoggedIn(true);
        }).catch(() => setWaError("Tidak dapat terhubung ke Backend Bot."));

        return () => clearInterval(interval);
    }, [isAuthenticated, qrString]);

    // Fetch Spreadsheet Config
    useEffect(() => {
        if (!isAuthenticated) return;

        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/config/spreadsheet`)
            .then(res => res.json())
            .then(data => {
                if (data.spreadsheet_id) {
                    setSpreadsheetId(data.spreadsheet_id);
                }
            })
            .catch(err => console.error("Gagal load config:", err));
    }, [isAuthenticated]);

    const handleSaveConfig = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setConfigStatus({ type: null, message: "" });

        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/config/spreadsheet`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ spreadsheet_id: spreadsheetId })
            });
            const data = await res.json();
            
            if (res.ok) {
                setConfigStatus({ type: "success", message: data.message });
            } else {
                setConfigStatus({ type: "error", message: data.error || "Gagal menyimpan konfigurasi" });
            }
        } catch (err) {
            setConfigStatus({ type: "error", message: "Kesalahan jaringan" });
        } finally {
            setIsSaving(false);
        }
    };

    const handleWaLogout = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/wa/logout`, {
                method: "POST"
            });
            if (res.ok) {
                setIsWaLoggedIn(false);
                setQrString("");
            }
        } catch (err) {
            console.error("Gagal logout WA:", err);
        }
    };

    if (isLoading || !isAuthenticated) return null;

    return (
        <div className="animate-in fade-in duration-500">
            <header className="mb-8">
                <h1 className="text-2xl font-bold text-zinc-800">Koneksi Layanan</h1>
                <p className="text-zinc-500 mt-1">Konfigurasi tautan WhatsApp dan Spreadsheet Anda.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Panel Kiri: Konfigurasi Spreadsheet */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-zinc-100 h-fit">
                    <h2 className="text-2xl font-bold text-zinc-800 mb-2">Google Sheets</h2>
                    <p className="text-zinc-500 mb-8 text-sm">
                        Masukkan Tautan / URL Spreadsheet tempat bot akan menyimpan data pesan.
                        Pastikan Google Sheets Anda dapat diakses oleh kredensial bot.
                    </p>

                    {configStatus.message && (
                        <AuthAlert 
                            message={configStatus.message} 
                            type={configStatus.type === "success" ? "success" : "error"} 
                            className="mb-6"
                        />
                    )}

                    <form onSubmit={handleSaveConfig} className="flex flex-col gap-6">
                        <TextField
                            label="Tautan Spreadsheet (URL)"
                            placeholder="https://docs.google.com/spreadsheets/d/1BxiMVs0XRYNz_0...dst/edit"
                            value={spreadsheetId}
                            variant="vertical"
                            onChange={(e) => setSpreadsheetId(e.target.value)}
                            className="bg-zinc-50"
                        />
                        
                        <Button 
                            type="submit" 
                            disabled={isSaving}
                            className="bg-[#00a884] hover:bg-[#128C7E] text-white w-full sm:w-auto self-start"
                        >
                            {isSaving ? "Menyimpan..." : "Simpan Konfigurasi"}
                        </Button>
                    </form>
                </div>

                {/* Panel Kanan: Koneksi WhatsApp */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-zinc-100 flex flex-col items-center">
                    <div className="text-center w-full mb-8">
                        <h2 className="text-2xl font-bold text-zinc-800 mb-2">Koneksi WhatsApp</h2>
                        <p className="text-zinc-500 text-sm">
                            Tautkan perangkat WhatsApp Anda agar bot dapat berfungsi.
                        </p>
                    </div>

                    <div className="flex flex-col items-center justify-center bg-zinc-50 w-full rounded-xl py-12 border border-dashed border-zinc-200">
                        {isWaLoggedIn ? (
                            <div className="flex flex-col items-center text-center animate-in fade-in zoom-in duration-500">
                                <div className="w-20 h-20 bg-[#00a884] rounded-full flex items-center justify-center text-white text-3xl mb-4 shadow-md">
                                    ✓
                                </div>
                                <h3 className="text-xl font-bold text-zinc-800 mb-1">Terhubung</h3>
                                <p className="text-zinc-500 text-sm mb-4">Bot Anda saat ini aktif.</p>
                                <Button 
                                    variant="outline"
                                    className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                                    onClick={handleWaLogout}
                                >
                                    Putuskan Koneksi WA
                                </Button>
                            </div>
                        ) : (
                            <>
                                <div className="bg-white p-4 rounded-xl shadow-sm border border-zinc-100 mb-6">
                                    {qrString ? (
                                        <QRCodeSVG value={qrString} size={240} level="L" />
                                    ) : (
                                        <div className="w-[240px] h-[240px] flex items-center justify-center bg-zinc-50">
                                            <span className="text-zinc-400 text-sm animate-pulse">Memuat QR Code...</span>
                                        </div>
                                    )}
                                </div>
                                <div className="px-6 py-2 bg-white border border-zinc-200 rounded-full text-zinc-600 text-sm font-medium">
                                    {waError ? <span className="text-red-500">{waError}</span> : "Menunggu Pemindaian QR"}
                                </div>
                            </>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
