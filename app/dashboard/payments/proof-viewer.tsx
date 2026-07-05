"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";

interface ProofViewerProps {
  proofUrl: string | null;
}

export default function ProofViewer({ proofUrl }: ProofViewerProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!proofUrl) {
    return <span className="text-sm text-muted-foreground">No proof</span>;
  }

  return (
    <>
      <Button
        variant="link"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="text-sm text-emerald-300 p-0 h-auto hover:text-emerald-200"
      >
        View Proof
      </Button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <Card className="max-w-4xl w-full h-auto max-h-[90vh] border-0 shadow-2xl">
            <div className="p-6 space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">
                  Payment Proof
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Image */}
              <div className="relative w-full bg-slate-100 rounded-lg overflow-hidden min-h-100">
                <Image
                  src={proofUrl}
                  alt="Payment Proof"
                  width={1200}
                  height={800}
                  className="w-full h-full object-contain"
                  sizes="(max-width: 768px) 100vw, 1000px"
                />
              </div>

              {/* Footer Actions */}
              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  size="sm"
                >
                  Close
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  <a href={proofUrl} target="_blank" rel="noopener noreferrer">
                    Download
                  </a>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
