'use client'

import React from 'react';
import { Button } from "@/components/ui/button";
import { toast } from 'react-hot-toast';

const ToastButton = () => {
    // Define the onClick handler
    const handleClick = () => {
        toast("Button clicked!"); // Show toast notification
    };

    return (
        <Button onClick={handleClick}>Test</Button>
    );
};

export default ToastButton;