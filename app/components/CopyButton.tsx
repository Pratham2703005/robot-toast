"use client";

import { useState } from "react";
import { toast } from "robot-toast";

interface CopyButtonProp {
  text: string;
  styling: string;
}

export default function CopyButton({ text, styling }: CopyButtonProp) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast({
        message: "Failed to copy code",
        type: "error",
      });
    }
  };

  return (
    <button
      type="button"
      className={styling}
      onClick={() => copyToClipboard(text)}
    >
      {copied ? "✓ copied!" : "copy"}
    </button>
  );
}
