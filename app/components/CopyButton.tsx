"use client";

import { useState } from "react";

interface CopyButtonProp {
    text: string;
    styling: string;
}

export default function CopyButton({ text, styling }: CopyButtonProp) {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async (text: string) => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setInterval(() => setCopied(false), 1800);
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