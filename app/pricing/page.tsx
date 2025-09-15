"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Check,
  Zap,
  Crown,
  Building,
  Sparkles,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for getting started with AI course generation",
    features: [
      "Generate up to 3 courses per month",
      "Basic course templates",
      "Community support",
      "Export to PDF",
      "1 GB storage",
    ],
    buttonText: "Get Started",
    popular: false,
    icon: Sparkles,
  },
  {
    name: "Pro",
    price: "$19",
    description: "For serious educators and content creators",
    features: [
      "Unlimited course generation",
      "Advanced AI capabilities",
      "Priority support",
      "All export formats",
      "10 GB storage",
      "Custom branding",
      "Quiz generation",
      "Video integration",
    ],
    buttonText: "Upgrade to Pro",
    popular: true,
    icon: Crown,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For organizations and educational institutions",
    features: [
      "Everything in Pro",
      "Team management",
      "SSO integration",
      "Custom AI models",
      "API access",
      "Dedicated support",
      "White-label solution",
      "Unlimited storage",
    ],
    buttonText: "Contact Sales",
    popular: false,
    icon: Building,
  },
];

export default function PricingPage() {
  const { isSignedIn } = useUser();
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">(
    "monthly",
  );

  const getPrice = (price: string) => {
    if (price === "Custom") return price;
    if (billingPeriod === "annual") {
      const monthlyPrice = parseInt(price.replace("$", ""));
      const annualPrice = monthlyPrice * 12 * 0.8; // 20% discount
      return `$${annualPrice.toFixed(0)}`;
    }
    return price;
  };

  const getBillingText = (price: string) => {
    if (price === "Custom") return "";
    return billingPeriod === "annual" ? "/year (20% off)" : "/month";
  };

  return (
    <div className="container max-w-6xl bg-white py-8">
      <div className="flex flex-col gap-12">
        <div className="text-center">
          <h1 className="text-4xl font-black tracking-tight">Pricing Plans</h1>
          <p className="mt-4 font-medium text-black">
            Choose the plan that works best for you. All plans include access to
            our AI course generation technology.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="inline-flex rounded-md border-2 border-black bg-yellow-300 p-1 shadow-[4px_4px_0_0_rgb(0,0,0)]">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={`rounded-md px-4 py-2 text-sm font-bold ${
                billingPeriod === "monthly"
                  ? "border border-black bg-white text-black shadow-[2px_2px_0_0_rgb(0,0,0)]"
                  : "text-black"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod("annual")}
              className={`rounded-md px-4 py-2 text-sm font-bold ${
                billingPeriod === "annual"
                  ? "border border-black bg-white text-black shadow-[2px_2px_0_0_rgb(0,0,0)]"
                  : "text-black"
              }`}
            >
              Annual (20% off)
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {plans.map((plan) => {
            const IconComponent = plan.icon;
            return (
              <Card
                key={plan.name}
                className={`flex flex-col border-4 border-black bg-white shadow-[8px_8px_0_0_rgb(0,0,0)] ${
                  plan.popular ? "scale-105" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 transform">
                    <span className="rounded-full border-2 border-black bg-yellow-300 px-4 py-1 text-sm font-black text-black">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader>
                  <div className="mb-2 flex items-center gap-3">
                    <div className="rounded-lg border-2 border-black bg-yellow-300 p-2">
                      <IconComponent className="h-6 w-6 text-black" />
                    </div>
                    <CardTitle className="text-2xl font-black text-black">
                      {plan.name}
                    </CardTitle>
                  </div>
                  <div className="mt-4">
                    <span className="text-4xl font-black text-black">
                      {getPrice(plan.price)}
                    </span>
                    <span className="ml-2 font-medium text-black">
                      {getBillingText(plan.price)}
                    </span>
                  </div>
                  <CardDescription className="font-medium text-black">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow pt-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <Check className="mt-0.5 mr-2 h-5 w-5 flex-shrink-0 text-green-600" />
                        <span className="text-sm font-medium text-black">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full border-2 border-black py-6 text-lg font-bold shadow-[4px_4px_0_0_rgb(0,0,0)] transition-all hover:shadow-[6px_6px_0_0_rgb(0,0,0)] ${
                      plan.popular
                        ? "bg-yellow-300 text-black hover:bg-yellow-400"
                        : "bg-white text-black hover:bg-gray-100"
                    }`}
                    size="lg"
                  >
                    {isSignedIn ? plan.buttonText : "Sign Up Free"}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 border-4 border-black bg-white p-8 shadow-[8px_8px_0_0_rgb(0,0,0)]">
          <h2 className="mb-8 border-b-4 border-black pb-4 text-center text-2xl font-black text-black">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="border-2 border-black bg-gray-100 p-4">
              <h3 className="mb-2 font-black text-black">
                Can I change plans anytime?
              </h3>
              <p className="text-black">
                Yes, you can upgrade, downgrade, or cancel your plan at any
                time. Changes will be reflected in your next billing cycle.
              </p>
            </div>
            <div className="border-2 border-black bg-gray-100 p-4">
              <h3 className="mb-2 font-black text-black">
                Is there a free trial?
              </h3>
              <p className="text-black">
                The Free plan is always free. For paid plans, we offer a 14-day
                free trial so you can test all features before committing.
              </p>
            </div>
            <div className="border-2 border-black bg-gray-100 p-4">
              <h3 className="mb-2 font-black text-black">
                What payment methods do you accept?
              </h3>
              <p className="text-black">
                We accept all major credit cards, PayPal, and for annual plans,
                we can also process bank transfers.
              </p>
            </div>
            <div className="border-2 border-black bg-gray-100 p-4">
              <h3 className="mb-2 font-black text-black">
                Do you offer educational discounts?
              </h3>
              <p className="text-black">
                Yes, we offer special pricing for educational institutions,
                teachers, and students. Contact our sales team for more
                information.
              </p>
            </div>
          </div>
        </div>

        <section className="mx-4 rounded-lg border-4 border-black bg-yellow-300 p-8 shadow-[8px_8px_0_0_rgb(0,0,0)] md:p-12">
          <div className="flex flex-col items-center gap-6 text-center">
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              Ready to Create Your Course?
            </h2>
            <p className="max-w-[600px] font-medium text-black">
              Join thousands of educators and trainers who are saving time and
              enhancing their teaching with AI.
            </p>
            <Button
              asChild
              size="lg"
              className="gap-2 border-2 border-black bg-white font-bold text-black shadow-[4px_4px_0_0_rgb(0,0,0)] transition-all hover:translate-y-0.5 hover:bg-gray-100 hover:shadow-[6px_6px_0_0_rgb(0,0,0)]"
            >
              <Link href="/sign-up">
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <div className="flex flex-col items-center gap-4 text-sm font-medium text-black sm:flex-row">
              <div className="flex items-center gap-1 border-2 border-black bg-white px-2 py-1">
                <CheckCircle className="h-4 w-4 text-black" />
                No credit card required
              </div>
              <div className="flex items-center gap-1 border-2 border-black bg-white px-2 py-1">
                <CheckCircle className="h-4 w-4 text-black" />
                Free plan available
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
