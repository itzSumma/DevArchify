"use client"
import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { cn } from "@/lib/utils" // আপনার utils ফাইলটি চেক করে নেবেন

const DropdownMenu = DropdownMenuPrimitive.Root
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
const DropdownMenuContent = DropdownMenuPrimitive.Content
const DropdownMenuItem = DropdownMenuPrimitive.Item
const DropdownMenuLabel = DropdownMenuPrimitive.Label
const DropdownMenuSeparator = DropdownMenuPrimitive.Separator

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
}