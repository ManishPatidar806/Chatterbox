import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  User,
  Mail,
  Lock,
  Camera,
  Save,
  Edit3,
  Eye,
  EyeOff,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import apiClient from "./apiClient";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const isoString = "2025-09-16T11:41:26.635Z";

 const { toast } = useToast();

const [profileData, setProfileData] = useState({
  name: "Manish Patidar",
  email: "mp6012217@Gmail.com",
  joinDate: "January 2024",
});

const [passwordData, setPasswordData] = useState({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await apiClient.get("/user/profile");
      const date = new Date(res.data?.data.createdAt);
      setProfileData({
        name: res.data?.data.fullName,
        email: res.data?.data.email,
        joinDate: date.toLocaleString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
      });
    } catch (error) {
      toast({
        title: "Profile not found",
        description: error.response?.data?.message || error.message,
      });
    }
  };
  fetchProfile();
}, []);

const handleProfileUpdate = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  try {
    const res = await apiClient.post("/user/updateInfo", profileData);
    const date = new Date(res.data?.data.createdAt);
    setProfileData({
      name: res.data?.data.fullName,
      email: res.data?.data.email,
      joinDate: date.toLocaleString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    });
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    });
  } catch (error) {
    toast({
      title: "Profile Update Failed",
      description: error.response?.data?.message || error.message,
    });
  } finally {
    setIsLoading(false);
    setIsEditing(false);
  }
};

const handlePasswordChange = async (e: React.FormEvent) => {
  e.preventDefault();
  if (passwordData.newPassword !== passwordData.confirmPassword) {
    return toast({
      title: "Error",
      description: "New passwords don't match.",
      variant: "destructive",
    });
  }
  setIsLoading(true);
  try {
    await apiClient.post("/user/changepassword", passwordData);
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    toast({
      title: "Password Updated",
      description: "Your password has been changed successfully.",
    });
  } catch (error) {
    toast({
      title: "Password Update Failed",
      description: error.response?.data?.message || error.message,
    });
  } finally {
    setIsLoading(false);
  }
};

const handleRemoveAccount = async () => {
  try {
    const res = await apiClient.get("/user/remove");
    if (res.data.success) {
      toast({ title: "Account Removed", description: res.data.message });
      navigate("/login");
    } else {
      toast({ title: "Remove Failed", description: res.data.message });
    }
  } catch (error) {
    toast({
      title: "Remove Failed",
      description: error.response?.data?.message || error.message,
    });
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="icon" className="hover-lift">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold">Profile Settings</h1>
          </div>
        </div>
      </div>

      <div className="container py-8 max-w-4xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <div className="space-y-6">
            <Card className="border-0 bg-card/50 backdrop-blur shadow-elegant animate-fade-in">
              <CardContent className="p-6 text-center space-y-4">
                <div className="relative inline-block">
                  <Avatar className="h-24 w-24 mx-auto">
                    <AvatarFallback className="text-2xl bg-gradient-to-r from-primary/20 to-secondary/20">
                      {profileData?.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full shadow-md"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>

                <div>
                  <h2 className="text-xl font-bold">{profileData.name}</h2>
                  <p className="text-muted-foreground">{profileData.email}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Member since {profileData.joinDate}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card className="border-0 bg-card/50 backdrop-blur shadow-elegant animate-slide-up">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Manage your account details and preferences
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  {isEditing ? "Cancel" : "Edit"}
                </Button>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            name: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                        className="focus-ring"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="label"
                        value={profileData.email}
                      />
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex justify-end space-x-2">
                      <Button type="submit" variant="hero" disabled={isLoading}>
                        {isLoading ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            <span>Saving...</span>
                          </div>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>

            {/* Password Change */}
            <Card
              className="border-0 bg-card/50 backdrop-blur shadow-elegant animate-slide-up"
              style={{ animationDelay: "0.1s" }}
            >
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>
                  Update your password to keep your account secure
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showCurrentPassword ? "text" : "password"}
                        value={passwordData.currentPassword}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            currentPassword: e.target.value,
                          })
                        }
                        className="focus-ring pr-10"
                        placeholder="Enter current password"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showCurrentPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <div className="relative">
                        <Input
                          id="newPassword"
                          type={showNewPassword ? "text" : "password"}
                          value={passwordData.newPassword}
                          onChange={(e) =>
                            setPasswordData({
                              ...passwordData,
                              newPassword: e.target.value,
                            })
                          }
                          className="focus-ring pr-10"
                          placeholder="Enter new password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showNewPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">
                        Confirm New Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={passwordData.confirmPassword}
                          onChange={(e) =>
                            setPasswordData({
                              ...passwordData,
                              confirmPassword: e.target.value,
                            })
                          }
                          className="focus-ring pr-10"
                          placeholder="Confirm new password"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="secondary"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        <span>Updating...</span>
                      </div>
                    ) : (
                      <>
                        <Lock className="h-4 w-4 mr-2" />
                        Update Password
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Account Settings */}
            <Card
              className="border-0 bg-card/50 backdrop-blur shadow-elegant animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              <CardHeader>
                <CardTitle>Remove Account </CardTitle>
                <CardDescription>
                  Remove your Account Permanently
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium text-destructive">
                      Delete Account
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Permanently remove your account and data
                    </p>
                  </div>
                  <Button
                    onClick={handleRemoveAccount}
                    variant="destructive"
                    size="sm"
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
