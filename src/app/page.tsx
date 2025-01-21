import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Container } from "@/components/Wrapper";
import { RiAddFill } from "@remixicon/react";

export default function Home() {
  return (
    <Container>
      <div className="flex  w-full gap-4 justify-center item-center">
        <Input placeholder="Masukan task ..." />
        <Button asChild>
          <a href="#installation">
            <RiAddFill />
          </a>
        </Button>
      </div>
    </Container>
  );
}
