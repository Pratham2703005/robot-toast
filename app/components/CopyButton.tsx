"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { toast } from "robot-toast";
import { typing } from "robot-toast/robots";

interface CopyButtonProp {
    text: string;
    styling: string;
}

export default function CopyButton({ text, styling }: CopyButtonProp) {
    const [copied, setCopied] = useState(false);
    const { resolvedTheme } = useTheme();

    const copyToClipboard = async (text: string) => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
        toast({
            message: 'Copied to clipboard!',
            type: 'info',
            theme: resolvedTheme === 'light' ? 'light' : 'dark',
            robotVariant: typing,
            typeSpeed: 30,
            autoClose: 2000,
            hideProgressBar: true,
            position: 'bottom-right',
        });
    };

    return (
        <button
            className={styling}
            onClick={() => copyToClipboard(text)}
        >
            {copied ? '✓ copied!' : 'copy'}
        </button>
    );
}
