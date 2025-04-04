"use client";
import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const FlipWords = ({
    words,
    duration = 3000,
    className,
}: {
    words: string[];
    duration?: number;
    className?: string;
}) => {
    const [currentWord, setCurrentWord] = useState(words[0]);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);

    const startAnimation = useCallback(() => {
        const nextWord = words[(words.indexOf(currentWord) + 1) % words.length];
        setCurrentWord(nextWord);
        setIsAnimating(true);
    }, [currentWord, words]);

    // Handle word change animation cycle
    useEffect(() => {
        if (!isAnimating) {
            const timer = setTimeout(() => {
                startAnimation();
            }, duration);

            return () => clearTimeout(timer); // Clear timeout to avoid memory leaks
        }
    }, [isAnimating, duration, startAnimation]);

    // Extract gradient classes for reapplication
    const gradientClasses = className?.split(' ').filter(cls => 
        cls.includes('gradient') || 
        cls.includes('from-') || 
        cls.includes('via-') || 
        cls.includes('to-') || 
        cls === 'text-transparent' || 
        cls === 'bg-clip-text'
    ).join(' ');

    return (
        <span className={cn("inline-block", className)} style={{ lineHeight: "1.3", paddingBottom: "0.3em" }}>
            <AnimatePresence onExitComplete={() => setIsAnimating(false)}>
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{
                        opacity: 0,
                        y: -40,
                        filter: "blur(8px)",
                        scale: 2,
                        position: "absolute",
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 10,
                    }}
                    key={currentWord}
                    className={cn(
                        "z-10 inline-block relative text-left",
                        gradientClasses
                    )}
                >
                    {currentWord}
                </motion.span>
            </AnimatePresence>
        </span>
    );
};