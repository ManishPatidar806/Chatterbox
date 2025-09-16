import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  MessageSquare,
  FileText,
  User,
  LogOut,
  Bot,
  Zap,
  Upload,
  Settings,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "./apiClient";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const user = {
    name: "MANISH PATIDAR",
    email: "mp601217@example.com",
  };

  const featureCards = [
    {
      title: "Start Chat",
      description: "Begin a conversation with our AI assistant",
      icon: MessageSquare,
      href: "/chat",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "View Profile",
      description: "Manage your account settings and preferences",
      icon: User,
      href: "/profile",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
  ];

  const recentActivity = [
    { type: "chat", title: "AI Strategy Discussion", time: "2 hours ago" },
    { type: "upload", title: "Marketing Report.pdf", time: "1 day ago" },
    { type: "chat", title: "Product Feedback Analysis", time: "3 days ago" },
  ];

  const handleLogout = async () => {
    const response = await apiClient.post("/user/logout");
    if (response.data.success) {
      toast({
        title: "Logout Successfully",
        description: response.data.message,
      });
      navigate("/login");
    } else {
      toast({
        title: "Logout Failed",
        description: response.data.message,
      });
    }
  };

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
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <div className="container py-8 space-y-8">
        {/* Welcome Section */}
        <div className="space-y-2 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold">
            Welcome back,{" "}
            <span className="gradient-hero bg-clip-text text-transparent">
              {user.name}
            </span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Ready to continue your intelligent conversations?
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {featureCards.map((card, index) => (
            <Link key={card.title} to={card.href}>
              <Card
                className="hover-lift cursor-pointer transition-all duration-300 hover:shadow-elegant border-0 bg-card/50 backdrop-blur group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="space-y-4">
                  <div
                    className={`w-12 h-12 rounded-lg ${card.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}
                  >
                    <card.icon className={`h-6 w-6 ${card.color}`} />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{card.title}</CardTitle>
                    <CardDescription className="text-sm leading-relaxed mt-2">
                      {card.description}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>

        {/* Stats Cards */}
        {/* <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-0 bg-gradient-to-r from-primary/10 to-primary/5 backdrop-blur animate-slide-up">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Conversations</p>
                  <p className="text-2xl font-bold text-primary">47</p>
                </div>
                <MessageSquare className="h-8 w-8 text-primary/60" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-r from-secondary/10 to-secondary/5 backdrop-blur animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Documents Processed</p>
                  <p className="text-2xl font-bold text-secondary">12</p>
                </div>
                <FileText className="h-8 w-8 text-secondary/60" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-r from-accent/10 to-accent/5 backdrop-blur animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Hours Saved</p>
                  <p className="text-2xl font-bold text-accent">23</p>
                </div>
                <Zap className="h-8 w-8 text-accent/60" />
              </div>
            </CardContent>
          </Card>
        </div> */}

        {/* Recent Activity */}
        <Card
          className="border-0 bg-card/50 backdrop-blur animate-slide-up"
          style={{ animationDelay: "0.3s" }}
        >
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your latest interactions and uploads
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div
                    className={`p-2 rounded-lg ${
                      activity.type === "chat"
                        ? "bg-primary/10"
                        : "bg-secondary/10"
                    }`}
                  >
                    {activity.type === "chat" ? (
                      <MessageSquare
                        className={`h-4 w-4 ${
                          activity.type === "chat"
                            ? "text-primary"
                            : "text-secondary"
                        }`}
                      />
                    ) : (
                      <FileText className="h-4 w-4 text-secondary" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card
          className="border-0 bg-gradient-to-r from-muted/20 to-background backdrop-blur animate-slide-up"
          style={{ animationDelay: "0.4s" }}
        >
          <CardContent className="p-8 text-center space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Ready for your next conversation?
              </h3>
              <p className="text-muted-foreground">
                Start chatting with our AI .
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/chat">
                <Button
                  variant="hero"
                  size="lg"
                  className="w-full sm:w-auto hover-glow"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Start New Chat
                </Button>
              </Link>
              {/* <Link to="/upload">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Document
                </Button>
              </Link> */}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
