"use client";

import { ModalProps } from "@/interfaces/modal";

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-background rounded-lg p-6 w-160">{children}</div>
      </div>
    </>
  );
}
