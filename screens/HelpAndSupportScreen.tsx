
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Globe, Building } from 'lucide-react';

const StatCard = ({ value, label, icon }: { value: string; label: string; icon: React.ReactNode }) => (
    <div className="bg-card p-6 rounded-xl shadow-sm dark:shadow-none border border-border flex flex-col items-center text-center">
        {icon}
        <p className="text-4xl font-extrabold text-card-foreground mt-3">{value}</p>
        <p className="text-muted-foreground mt-1">{label}</p>
    </div>
);

const HelpAndSupportScreen = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-background text-foreground min-h-screen font-sans">
             <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg">
                <div className="max-w-4xl mx-auto p-4 flex items-center">
                    <button onClick={() => navigate(-1)} className="p-2 mr-2 rounded-full hover:bg-secondary">
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-2xl font-bold">Help & Support</h1>
                </div>
            </header>
            <main className="max-w-4xl mx-auto p-4 md:p-6 space-y-12 pb-24">
                
                <section className="text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 mb-2">
                        Institutional Investors
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                        We manage assets on behalf of many of the world’s largest and most sophisticated investors, who in turn represent the interests of millions of workers and retirees.
                    </p>
                </section>
                
                <section>
                    <div className="bg-card rounded-xl p-8 shadow-sm dark:shadow-none border border-border">
                        <h3 className="text-2xl font-bold mb-4">Overview: Trusted Stewards of Institutional Capital</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            Fortress has been a trusted partner for institutional investors for over two decades. Our overriding objective is to help these limited partners achieve their investment goals and to support the financial well-being and security of their beneficiaries. These limited partners include public and private pensions, sovereign wealth funds, endowments and foundations, insurance companies and family offices.
                        </p>
                    </div>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    <StatCard value="1,700" label="Institutional Investors" icon={<Building size={36} className="text-primary"/>} />
                    <StatCard value="50+" label="Countries Represented" icon={<Globe size={36} className="text-blue-500"/>} />
                    <StatCard value="8,500" label="Institutional Commitments" icon={<Users size={36} className="text-success"/>} />
                </section>

                <footer className="text-center text-sm text-muted-foreground pt-8 border-t border-border">
                    <p>As of December 31, 2023.</p>
                </footer>
            </main>
        </div>
    );
};

export default HelpAndSupportScreen;