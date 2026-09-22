import { useState } from "react";
import { Button } from "~/components/ui/button";
import { TextField } from "~/components/ui/TextField";
import { Link } from "react-router";
import { useAuth } from "~/hooks/useAuth";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { AuthAlert } from "~/components/ui/AuthAlert";

export function RegisterDesktop() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    
    const [errors, setErrors] = useState({ name: false, email: false, password: false });
    const [registerError, setRegisterError] = useState<string | null>(null);
    const { registerCustomer, isLoading } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors = {
            name: !name.trim(),
            email: !email.trim(),
            password: !password.trim(),
        };

        setErrors(newErrors);
        setRegisterError(null);

        if (!newErrors.name && !newErrors.email && !newErrors.password) {
            try {
                await registerCustomer({
                    name,
                    email,
                    phone,
                    password,
                    address,
                });
            } catch (error: any) {
                console.error("Registration failed", error);
                setRegisterError(error.response?.data?.error || "Pendaftaran gagal. Silakan periksa kembali data Anda.");
            }
        }
    };

    return (
        <main className="relative min-h-screen w-screen overflow-hidden font-geist" style={{ width: "100vw" }}>
            <div className="absolute inset-0 z-0">
                <img
                    src="/images/kuning.png"
                    alt="Background"
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
            </div>

            <div className="relative z-10 flex min-h-screen w-full items-center justify-center p-4">
                <div 
                    className="flex overflow-hidden rounded-3xl bg-white shadow-[0_20px_50px_rgba(0,0,0,0.3)] animate-in fade-in zoom-in-95 duration-500 w-full max-w-5xl"
                    style={{ width: "100%", maxWidth: "1024px", minWidth: "800px" }}
                >
                    {/* Left Column: Customer Branding */}
                    <div className="hidden w-5/12 flex-col items-center justify-center bg-gradient-to-br from-[#00a884] to-[#0D7C82] p-12 lg:flex relative overflow-hidden">
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/20 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-10 right-10 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>

                        <div className="relative z-10 flex flex-col items-center text-center">
                            <div className="mb-8 rounded-2xl bg-white/90 p-4 shadow-lg shadow-black/5 backdrop-blur-sm">
                                <div className="w-28 h-28 flex items-center justify-center bg-[#00a884] rounded-xl text-white text-5xl shadow-inner">
                                    🛍️
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 text-white">
                                <span className="text-3xl font-bold leading-tight tracking-tight drop-shadow-sm">Akun Customer</span>
                                <span className="text-xl font-semibold text-white/90 leading-tight tracking-wide drop-shadow-sm">Selamat Datang!</span>
                            </div>
                            <p className="mt-6 text-sm text-white/90 w-full leading-relaxed font-medium drop-shadow-sm">
                                Buat akun customer Anda untuk menikmati berbagai fasilitas pesanan dan dukungan otomatis.
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Register Form */}
                    <div className="flex w-full flex-col justify-center bg-white p-8 lg:w-7/12 lg:p-12 overflow-y-auto max-h-[90vh]">
                        <div className="mb-6">
                            <h2 className="text-3xl font-bold text-zinc-900">Daftar Akun Baru</h2>
                            <p className="mt-2 text-zinc-500 text-sm">Lengkapi formulir berikut untuk mendaftar sebagai Customer.</p>
                        </div>

                        {registerError && (
                            <AuthAlert message={registerError} type="error" className="mb-6" />
                        )}

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <TextField
                                label="Nama Lengkap"
                                placeholder="Masukkan nama lengkap Anda"
                                value={name}
                                variant="vertical"
                                onChange={(e) => setName(e.target.value)}
                                error={errors.name}
                                className="bg-zinc-50 focus:bg-white transition-colors"
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <TextField
                                    label="Email"
                                    placeholder="nama@email.com"
                                    type="email"
                                    value={email}
                                    variant="vertical"
                                    onChange={(e) => setEmail(e.target.value)}
                                    error={errors.email}
                                    className="bg-zinc-50 focus:bg-white transition-colors"
                                />

                                <TextField
                                    label="Nomor Telepon (WhatsApp)"
                                    placeholder="081234567890"
                                    value={phone}
                                    variant="vertical"
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="bg-zinc-50 focus:bg-white transition-colors"
                                />
                            </div>

                            <TextField
                                label="Password"
                                placeholder="••••••••"
                                value={password}
                                type={showPassword ? "text" : "password"}
                                variant="vertical"
                                onChange={(e) => setPassword(e.target.value)}
                                error={errors.password}
                                className="bg-zinc-50 focus:bg-white transition-colors"
                                rightIcon={
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-zinc-400 hover:text-zinc-600 focus:outline-none flex items-center"
                                    >
                                        {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                                    </button>
                                }
                            />

                            <TextField
                                label="Alamat Lengkap (Opsional)"
                                placeholder="Jalan, Kota, Kode Pos"
                                value={address}
                                variant="vertical"
                                onChange={(e) => setAddress(e.target.value)}
                                className="bg-zinc-50 focus:bg-white transition-colors"
                            />

                            <Button
                                type="submit"
                                size="lg"
                                className="w-full mt-4 h-12 bg-[#00a884] hover:bg-[#0d7c82] text-white font-medium shadow-lg shadow-[#00a884]/20 transition-all active:scale-[0.98] rounded-xl text-base flex items-center justify-center gap-2"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                        <span>Mendaftarkan...</span>
                                    </div>
                                ) : (
                                    <>
                                        <UserPlus size={18} />
                                        <span>Daftar Sekarang</span>
                                    </>
                                )}
                            </Button>
                        </form>

                        <div className="mt-6 pt-4 border-t border-zinc-100 text-center flex items-center justify-between text-sm">
                            <span className="text-zinc-500">Sudah punya akun?</span>
                            <Link to="/login" className="font-semibold text-[#00a884] hover:underline">
                                Masuk ke akun Anda
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
