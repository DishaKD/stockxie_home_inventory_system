import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setPageTitle } from '../../store/themeConfigSlice';
import { IRootState } from '../../store';
import { setUser } from '../../store/authSlice';
import api from '../../config/axios';
const LoginCover = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Login'));
    });
    const navigate = useNavigate();
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);

    const [flag, setFlag] = useState(themeConfig.locale);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const submitForm = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await api.post('/api/adminusers/login', {
                email: formData.email,
                password: formData.password,
            });

            const { token, admin } = response.data;

            localStorage.setItem('adminToken', token);

            dispatch(
                setUser({
                    id: admin.id,
                    name: admin.name,
                    email: admin.email,
                })
            );

            navigate('/');
        } catch (err) {
            setError((err as any).response?.data?.message || 'Login failed. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-white">
            <div className="hidden lg:block w-[65%] relative bg-gradient-to-br from-[#00a2a9] to-[#00a2a9]">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-12">
                    <div className="w-full h-[70%] flex items-center justify-center">
                        <img src="/assets/images/loginbg2.png" alt="Organize with Stoxie" className="w-full h-full object-contain" />
                    </div>

                    <div className="w-full text-center mt-8 text-white">
                        <p className="text-2xl font-bold">Your Home Inventory Awaits!</p>
                        <p className="text-lg mt-2">Track. Organize. Control.</p>
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-[35%] flex items-center justify-center p-8 bg-white">
                <div className="w-full max-w-md">
                    <div className="mb-8 text-center">
                        <img src="/assets/images/StoxieLogo.png" alt="Company Logo" className="h-12 mx-auto mb-4" />
                        <h1 className="text-2xl font-bold text-gray-800">Sign In</h1>
                        <p className="text-gray-500 mt-1">Enter your credentials to continue</p>
                    </div>

                    {error && <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}

                    <form onSubmit={submitForm} className="space-y-5">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-[#04b4bc] focus:ring-2 focus:ring-[#04b4bc]/20 transition"
                                placeholder="your@email.com"
                            />
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <Link to="/auth/forgot-password" className="text-sm text-[#04b4bc] hover:text-[#04b4bc]/80">
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-[#04b4bc] focus:ring-2 focus:ring-[#04b4bc]/20 transition pr-12"
                                    placeholder="••••••••"
                                />
                                <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                            />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                                            />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-[#00a2a9] focus:ring-[#00a2a9] border-gray-300 rounded" />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                Remember me
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 px-4 bg-[#00a2a9] hover:bg-[#00a2a9]/90 text-white font-medium rounded-lg transition ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Signing in...
                                </span>
                            ) : (
                                'Sign in'
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-gray-500 text-sm">
                            Don't have an account?{' '}
                            <Link to="/auth/register" className="text-[#04b4bc] hover:text-[#04b4bc]/80 font-medium">
                                Create account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginCover;
