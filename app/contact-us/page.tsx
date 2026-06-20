import { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { PageHeader } from "@/common/components/header";

export const metadata: Metadata = {
  title: "Contact Us | VoidThread",
  description:
    "Get in touch with the VoidThread team for any inquiries or support.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="Contact Us"
        description="Have a question about an order, a specific drop, or just want to say hi? Our team is here to help."
      />
      <div className="container mx-auto px-6 py-16 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Contact Info */}
          <div className="flex flex-col gap-10">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                Get in Touch
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Have a question about an order, a specific drop, or just want to
                say hi? Our team is here to help.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-3 p-6 rounded-3xl bg-muted/30 border border-border/50">
                <Mail className="h-6 w-6 text-primary" />
                <h3 className="font-bold text-foreground">Email</h3>
                <p className="text-sm text-muted-foreground">
                  support@voidthread.com
                </p>
              </div>
              <div className="flex flex-col gap-3 p-6 rounded-3xl bg-muted/30 border border-border/50">
                <Phone className="h-6 w-6 text-primary" />
                <h3 className="font-bold text-foreground">Phone</h3>
                <p className="text-sm text-muted-foreground">
                  +1 (555) 000-VOID
                </p>
              </div>
              <div className="flex flex-col gap-3 p-6 rounded-3xl bg-muted/30 border border-border/50">
                <MapPin className="h-6 w-6 text-primary" />
                <h3 className="font-bold text-foreground">Studio</h3>
                <p className="text-sm text-muted-foreground">
                  123 Avant-Garde St, Design District, NY 10001
                </p>
              </div>
              <div className="flex flex-col gap-3 p-6 rounded-3xl bg-muted/30 border border-border/50">
                <Clock className="h-6 w-6 text-primary" />
                <h3 className="font-bold text-foreground">Hours</h3>
                <p className="text-sm text-muted-foreground">
                  Mon - Fri: 9am - 6pm EST
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-10 rounded-[2.5rem] bg-muted/20 border border-border/50 shadow-2xl shadow-primary/5">
            <form className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium px-2">Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="h-12 rounded-2xl bg-background border border-border/50 px-4 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium px-2">Email</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="h-12 rounded-2xl bg-background border border-border/50 px-4 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium px-2">Subject</label>
                <input
                  type="text"
                  placeholder="Order Inquiry"
                  className="h-12 rounded-2xl bg-background border border-border/50 px-4 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium px-2">Message</label>
                <textarea
                  rows={5}
                  placeholder="How can we help you?"
                  className="rounded-2xl bg-background border border-border/50 p-4 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                />
              </div>
              <button className="h-14 w-full rounded-2xl bg-primary text-primary-foreground font-bold shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all mt-4">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
