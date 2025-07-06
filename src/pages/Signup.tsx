
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup attempt:", formData);
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    
    if (Object.values(formData).every(field => field.trim())) {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userEmail", formData.email);
      localStorage.setItem("userCoins", "5");
      toast.success("Account created successfully! You've received 5 free coins to get started.");
      navigate("/dashboard");
    } else {
      toast.error("Please fill in all fields");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Navbar />
      
      <div className="pt-20 flex items-center justify-center px-4 py-12 min-h-screen">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create your account</h1>
            <p className="text-gray-600">Start tracking your warranties today</p>
          </div>

          <Card className="p-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-gray-700 font-medium">
                    First name
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="mt-2 h-12 border-gray-300 focus:border-blue-500 rounded-lg"
                    placeholder="John"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-gray-700 font-medium">
                    Last name
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="mt-2 h-12 border-gray-300 focus:border-blue-500 rounded-lg"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  Email address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-2 h-12 border-gray-300 focus:border-blue-500 rounded-lg"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-2 h-12 border-gray-300 focus:border-blue-500 rounded-lg"
                  placeholder="Create a strong password"
                  required
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">
                  Confirm password
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="mt-2 h-12 border-gray-300 focus:border-blue-500 rounded-lg"
                  placeholder="Confirm your password"
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-semibold rounded-lg"
              >
                Create Account
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Signup;
