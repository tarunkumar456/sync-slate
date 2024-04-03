"use client"

import { FormEventHandler, useState } from "react";
import { toast } from "sonner";
import { v } from "convex/values";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogClose,
    DialogFooter,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";


interface RenameModalProps {
    children: React.ReactNode,
    id: string,
    // onConfirm: () => void,
    title: string,
}
export const RenameModal = ({ children, title, id }: RenameModalProps) => {

    const {
        mutate,
        pending
    } = useApiMutation(api.board.update);

    const [new_title, setTitle] = useState(title);

    const onSubmit = () => {

        mutate({
            id: id,
            title: new_title,
        })
            .then(() => {
                toast.success("Board renamed");

            })
            .catch(() => toast.error("Failed to rename board"));
    };

    return (
        <Dialog>
            <DialogTrigger>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Edit board title
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Enter a new title for this board
                </DialogDescription>
                <div className="space-y-4">
                    <Input
                        required
                        maxLength={60}
                        value={new_title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Board title"
                    />
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>

                        </DialogClose>
                        <DialogClose>
                            <Button type="button" disabled={pending} onClick={onSubmit}>
                                Save
                            </Button>
                        </DialogClose>

                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
};
