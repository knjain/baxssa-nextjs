
"use client"
import React from 'react'
import { Nav } from './nav'
type Props = {}
import {
    LayoutDashboard,
    ShoppingCart,
    UsersRound,
   
  } from "lucide-react"
  
export default function Sidebar({}: Props) {
  return (
    <div><Nav
    isCollapsed={false}
    links={[
      {
        title: "Dashboard",
        href:"/",
        icon: LayoutDashboard,
        variant: "default",
      },
      {
        title: "User Details",
        href:"/users",
        icon: UsersRound,
        variant: "default",
      },{
        title: "Client Details",
        href:"/clients",
        icon: UsersRound,
        variant: "default",
      },
      {
        title: "Product Details",
        href:"/products",
        icon: LayoutDashboard,
        variant: "default",
      },{
        title: "Order Details",
        href:"/orders",
        icon: ShoppingCart,
        variant: "default",
      },
    ]}
  /></div>
  )
}