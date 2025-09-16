import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, FileText, Shield, Zap, Users, Bot } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-illustration.jpg";

const Landing = () => {
  const features = [
    {
      icon: MessageSquare,
      title: "Smart Conversations",
      description: "Engage in natural conversations with our advanced AI chatbot"
    },
    {
      icon: FileText,
      title: "Document Processing",
      description: "Upload PDFs and get instant insights and answers from your documents"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is protected with enterprise-grade security"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Get instant responses and seamless user experience"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bot className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold gradient-hero bg-clip-text text-transparent">
              ChatterBox
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/register">
              <Button variant="hero">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-slide-up">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Smart Conversations
                <span className="gradient-hero bg-clip-text text-transparent block">
                  Made Simple
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Experience the future of AI communication with ChatterBox. 
                Chat naturally, process documents instantly, and get intelligent insights.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register">
                <Button size="lg" variant="hero" className="w-full sm:w-auto hover-glow">
                  Start Chatting Free
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Sign In
                </Button>
              </Link>
            </div>

            <div className="flex items-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>10k+ Users</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>100% Secure</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4" />
                <span>Instant Responses</span>
              </div>
            </div>
          </div>

          <div className="relative animate-fade-in">
            <div className="absolute inset-0 gradient-hero rounded-3xl blur-3xl opacity-20 animate-glow"></div>
            <img
              src={heroImage}
              alt="ChatterBox AI Conversations"
              className="relative rounded-3xl shadow-2xl hover-lift"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-20 bg-gradient-to-r from-muted/30 via-background to-muted/30">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            Powerful Features for Modern Communication
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to have meaningful conversations with AI and extract insights from your documents.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className="hover-lift border-0 shadow-elegant bg-card/50 backdrop-blur"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 text-center space-y-4">
                <div className="mx-auto w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-20">
        <div className="text-center space-y-8 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Transform Your Communication?
          </h2>
          <p className="text-xl text-muted-foreground">
            Join thousands of users who are already experiencing smarter conversations with ChatterBox AI.
          </p>
          <Link to="/register">
            <Button size="lg" variant="hero" className="hover-glow animate-bounce-in">
              Get Started Today - It's Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container py-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Bot className="h-6 w-6 text-primary" />
                <span className="font-bold">ChatterBox</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Smart conversations made simple.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Product</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Features</div>
                <div>Pricing</div>
                <div>Security</div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Company</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>About</div>
                <div>Contact</div>
                <div>Careers</div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Legal</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Privacy Policy</div>
                <div>Terms of Service</div>
                <div>Cookie Policy</div>
              </div>
            </div>
          </div>
          <div className="border-t pt-8 mt-8 text-center text-sm text-muted-foreground">
            © 2024 ChatterBox. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;