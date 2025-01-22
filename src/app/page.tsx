"use client";
import { Input } from "@/components/ui/Input";
import { Container } from "@/components/Wrapper";
import { useState } from "react";

export default function Home() {
  return (
    <Container>
      <div className="flex  w-full gap-4 justify-center item-center">
        <Input placeholder="Masukan task ..." />
      </div>
    </Container>
  );
}
