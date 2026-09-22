import { useState } from "react";
import { Button } from "~/components/ui/button";
import { TextField } from "~/components/ui/TextField";
import { Link } from "react-router";
import { useAuth } from "~/hooks/useAuth";
import { Eye, EyeOff, UserPlus, ArrowLeft } from "lucide-react";
import { AuthAlert } from "~/components/ui/AuthAlert";

export function RegisterMobile() {
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
                setRegisterError(error.response?.data?.error || "Pendaftaran gagal.");
            }
        }
    };

    return (
        <main className="min-h-screen bg-zinc-50 p-4 font-geist flex flex-col justify-between">
            <div>
                <div className="flex items-center gap-3 mb-6 pt-2">
                    <Link to="/" className="p-2 rounded-full bg-white border border-zinc-200 text-zinc-700">
                        <ArrowLeft size={18} />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold text-zinc-900">Daftar Akun Customer</h1>
                        <p className="text-xs text-zinc-500">Buat akun untuk bertransaksi dengan mudah</p>
                    </div>
                </div>

                {registerError && (
                    <AuthAlert message={registerError} type="error" className="mb-4" />
                )}

                <form onSubmit={handleSubmit} className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm space-y-4">
                    <TextField
                        label="Nama Lengkap"
                        placeholder="Nama lengkap Anda"
                        value={name}
                        variant="vertical"
                        onChange={(e) => setName(e.target.value)}
                        error={errors.name}
                    />

                    <TextField
                        label="Email"
                        placeholder="nama@email.com"
                        type="email"
                        value={email}
                        variant="vertical"
                        onChange={(e) => setEmail(e.target.value)}
                        error={errors.email}
                    />

                    <TextField
                        label="Nomor WhatsApp"
                        placeholder="081234567890"
                        value={phone}
                        variant="vertical"
                        onChange={(e) => setPhone(e.target.value)}
                    />

                    <TextField
                        label="Password"
                        placeholder="••••••••"
                        value={password}
                        type={showPassword ? "text" : "password"}
                        variant="vertical"
                        onChange={(e) => setPassword(e.target.value)}
                        error={errors.password}
                        rightIcon={
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-zinc-400 hover:text-zinc-600 focus:outline-none flex items-center"
                            >
                                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                            </button>
                        }
                    />

                    <TextField
                        label="Alamat (Opsional)"
                        placeholder="Alamat pengiriman"
                        value={address}
                        variant="vertical"
                        onChange={(e) => setAddress(e.target.value)}
                    />

                    <Button
                        type="submit"
                        size="lg"
                        className="w-full mt-2 h-12 bg-[#00a884] hover:bg-[#0d7c82] text-white font-medium rounded-xl text-base flex items-center justify-center gap-2"
                        disabled={isLoading}
                    >
                        {isLoading ? "Mendaftarkan..." : "Daftar Akun"}
                    </Button>
                </form>
            </div>

            <div className="py-6 text-center text-sm border-t border-zinc-200 mt-6">
                <span className="text-zinc-500">Sudah punya akun? </span>
                <Link to="/login" className="font-semibold text-[#00a884]">
                    Masuk
                </Link>
            </div>
        </main>
    );
}
