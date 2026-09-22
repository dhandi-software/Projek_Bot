import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import { TextField } from "~/components/ui/TextField";
import { Link } from "react-router";
import { useAuth } from "~/hooks/useAuth";
import { Eye, EyeOff, User, Lock } from "lucide-react";
import { AuthAlert } from "~/components/ui/AuthAlert";

export function LoginMobile() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [errors, setErrors] = useState({ username: false, password: false, rememberMe: false });
    const [loginError, setLoginError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const { login, isLoading } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors = { username: false, password: false, rememberMe: false };

        if (!username) {
            newErrors.username = true;
        }
        if (!password) {
            newErrors.password = true;
        }

        setErrors(newErrors);
        setLoginError(null);

        if (!newErrors.username && !newErrors.password) {
            try {
                await login({ username, password });
            } catch (error: any) {
                console.error("Login failed", error);
                setLoginError(error.response?.data?.message || "Login failed. Please check your credentials.");
            }
        }
    };

    return (
        <main className="relative min-h-screen w-full overflow-hidden font-geist">
             {/* Full Screen Background */}
             <div className="absolute inset-0 z-0 bg-zinc-50"></div>

            <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-4 py-2">
                
                {/* Header: Logo & Title */}
                <div className="mb-6 flex flex-col items-center text-center">
                    <div className="mb-4 rounded-[20px] bg-white text-white p-3 shadow-md border border-zinc-100 flex items-center justify-center">
                        <img src="/images/Logo_Bot.png" alt="Logo Bot" className="w-12 h-12 object-contain" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <h1 className="text-2xl md:text-3xl font-extrabold text-[#1a1f2c] tracking-tight">WhatsApp Bot</h1>
                        <h2 className="text-xl md:text-2xl font-bold text-[#00a884] tracking-tight">Control Panel</h2>
                    </div>
                    <p className="mt-2 text-xs md:text-sm font-medium text-zinc-500 max-w-[280px] leading-relaxed">
                        Platform terintegrasi untuk pengelolaan bot WhatsApp dan Google Sheets.
                    </p>
                </div>

                <div 
                    className="rounded-3xl bg-white p-5 shadow-[0_8px_30px_rgb(0,0,0,0.08)] w-[95%] max-w-[420px] animate-in fade-in slide-in-from-bottom-5 duration-500"
                >
                    <div className="mb-5">
                        <h2 className="text-xl font-bold text-[#1a1f2c]">Welcome Back!</h2>
                        <p className="text-xs md:text-sm text-zinc-500 mt-1">Please enter your details to sign in.</p>
                    </div>

                    {loginError && (
                        <AuthAlert message={loginError} type="error" className="mb-5" />
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <TextField
                            label="Username"
                            placeholder="admin"
                            value={username}
                            variant="vertical"
                            onChange={(e) => setUsername(e.target.value)}
                            error={errors.username}
                            leftIcon={<User size={18} className="text-zinc-400" />}
                            className="bg-white"
                            inputClassName="h-11 border-zinc-200 focus-visible:ring-[#00a884]/20 focus-visible:border-[#00a884]"
                            labelClassName="font-bold text-xs md:text-sm text-[#1a1f2c]"
                        />
                        <div className="flex flex-col gap-1">
                            <TextField
                                label="Password"
                                placeholder="••••••••"
                                value={password}
                                type={showPassword ? "text" : "password"}
                                variant="vertical"
                                onChange={(e) => setPassword(e.target.value)}
                                error={errors.password}
                                leftIcon={<Lock size={18} className="text-zinc-400" />}
                                className="bg-white"
                                inputClassName="h-11 border-zinc-200 focus-visible:ring-[#00a884]/20 focus-visible:border-[#00a884]"
                                labelClassName="font-bold text-xs md:text-sm text-[#1a1f2c]"
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
                            <div className="flex justify-end mt-1">
                                <Link
                                    to="/forgot-password"
                                    className="text-[11px] md:text-xs font-semibold text-[#00a884] hover:text-[#128C7E] hover:underline transition-colors"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="remember-mobile"
                                checked={rememberMe}
                                onCheckedChange={(checked) =>
                                    setRememberMe(checked === true)
                                }
                               className="border-zinc-300 data-[state=checked]:bg-[#00a884] data-[state=checked]:border-[#00a884] rounded-md h-4 w-4"
                            />
                            <Label
                                htmlFor="remember-mobile"
                                className="text-xs md:text-sm font-medium text-zinc-600 cursor-pointer select-none"
                            >
                                Remember me
                            </Label>
                        </div>
                        
                        <Button
                            type="submit"
                            size="lg"
                            className="w-full mt-2 h-11 bg-[#00a884] hover:bg-[#128C7E] text-white font-semibold transition-all active:scale-[0.98] rounded-xl text-sm md:text-base"
                            disabled={isLoading}
                        >
                            {isLoading ? "Signing in..." : "Sign In"}
                        </Button>
                    </form>

                    <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs">
                        <span className="text-zinc-500">Belum punya akun Customer?</span>
                        <Link to="/register" className="font-semibold text-[#00a884] hover:underline">
                            Daftar
                        </Link>
                    </div>
                </div>

                <div className="mt-4 pb-2 text-center">
                    <p className="text-[10px] md:text-xs font-medium text-zinc-500">
                        © {new Date().getFullYear()} Bot Control Panel.<br/>All rights reserved.
                    </p>
                </div>
            </div>
        </main>
    );
}
