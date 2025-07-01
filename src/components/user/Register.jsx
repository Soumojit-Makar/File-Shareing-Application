import React, { useState } from "react";
import { User, Mail, Lock, Phone, MapPin, MessageSquare, Users, Eye, EyeOff, UserPlus, RotateCcw } from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    about: "",
    gender: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState("");

  const clearData = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      about: "",
      gender: "",
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Registration data:", formData);
      alert("Registration Successful! Please Login to continue");
      setLoading(false);
      clearData();
    }, 2000);
  };

  const InputField = ({ 
    icon: Icon, 
    label, 
    name, 
    type = "text", 
    required = true, 
    multiline = false,
    options = null 
  }) => {
    const isFocused = focusedField === name;
    const hasValue = formData[name];

    return (
      <div className="relative group">
        <div className={`relative transition-all duration-300 ${
          isFocused ? 'transform scale-[1.02]' : ''
        }`}>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div className={`relative bg-white/5 backdrop-blur-sm border rounded-xl transition-all duration-300 ${
            isFocused 
              ? 'border-purple-400 shadow-lg shadow-purple-500/25' 
              : 'border-white/20 hover:border-white/30'
          }`}>
            <div className="flex items-center p-4">
              <Icon className={`w-5 h-5 mr-3 transition-colors duration-300 ${
                isFocused ? 'text-purple-400' : 'text-gray-400'
              }`} />
              
              {options ? (
                <select
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  onFocus={() => setFocusedField(name)}
                  onBlur={() => setFocusedField("")}
                  required={required}
                  className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none"
                >
                  <option value="" className="bg-gray-800 text-gray-300">Select {label}</option>
                  {options.map((option) => (
                    <option key={option} value={option} className="bg-gray-800 text-white">
                      {option}
                    </option>
                  ))}
                </select>
              ) : multiline ? (
                <textarea
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  onFocus={() => setFocusedField(name)}
                  onBlur={() => setFocusedField("")}
                  placeholder={label}
                  required={required}
                  rows={3}
                  className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none resize-none"
                />
              ) : (
                <input
                  type={name === 'password' && showPassword ? 'text' : type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  onFocus={() => setFocusedField(name)}
                  onBlur={() => setFocusedField("")}
                  placeholder={label}
                  required={required}
                  className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none"
                />
              )}
              
              {name === 'password' && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="ml-2 text-gray-400 hover:text-purple-400 transition-colors duration-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              )}
            </div>
          </div>
        </div>
        
        <div className={`absolute -top-2 left-4 px-2 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-sm font-medium transition-all duration-300 ${
          isFocused || hasValue 
            ? 'text-purple-400 opacity-100' 
            : 'text-gray-500 opacity-0'
        }`}>
          {label}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-4">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent mb-2">
              Create Account
            </h1>
            <p className="text-gray-400">Join FileVault and start sharing securely</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <InputField
                icon={User}
                label="Full Name"
                name="name"
                type="text"
              />
              
              <InputField
                icon={Mail}
                label="Email Address"
                name="email"
                type="email"
              />
            </div>

            <InputField
              icon={Lock}
              label="Password"
              name="password"
              type="password"
            />

            <div className="grid md:grid-cols-2 gap-6">
              <InputField
                icon={Phone}
                label="Phone Number"
                name="phone"
                type="tel"
              />
              
              <InputField
                icon={Users}
                label="Gender"
                name="gender"
                options={["Male", "Female", "Other", "Prefer not to say"]}
              />
            </div>

            <InputField
              icon={MapPin}
              label="Address"
              name="address"
              type="text"
            />

            <InputField
              icon={MessageSquare}
              label="About Yourself"
              name="about"
              multiline={true}
            />

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="group flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-4 px-6 rounded-xl hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Creating Account...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    Create Account
                  </>
                )}
              </button>
              
              <button
                type="button"
                onClick={clearData}
                className="group flex-1 sm:flex-none bg-white/10 backdrop-blur-sm text-white font-semibold py-4 px-6 rounded-xl border border-white/20 hover:border-white/40 hover:bg-white/20 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center"
              >
                <RotateCcw className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                Reset
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="text-center mt-8 pt-6 border-t border-white/10">
            <p className="text-gray-400">
              Already have an account?{" "}
              <button className="text-purple-400 hover:text-purple-300 font-semibold transition-colors duration-300">
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;