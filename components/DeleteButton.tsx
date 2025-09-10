"use client";

import { useState } from "react";
import { Trash2, AlertTriangle, X, Check } from "lucide-react";
import { deleteCompanion } from "@/lib/actions/companion.actions";
import { toast } from "sonner";

interface DeleteButtonProps {
  companions: any[];
  userId: string;
}

export const DeleteButton = ({ companions, userId }: DeleteButtonProps) => {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAll = async () => {
    if (companions.length === 0) return;

    setIsDeleting(true);
    try {
      for (const companion of companions) {
        await deleteCompanion(companion.id);
      }

      toast.success("All companions deleted successfully!");
      window.location.reload();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete companions.");
    } finally {
      setIsDeleting(false);
      setIsConfirming(false);
    }
  };

  if (isConfirming) {
    return (
      <div className="flex items-center gap-2 bg-red-500/20 border border-red-500/30 rounded-lg p-2">
        <AlertTriangle className="h-4 w-4 text-red-400" />
        <span className="text-red-300 text-sm">
          Delete all {companions.length} companions?
        </span>
        <div className="flex gap-1">
          <button
            onClick={handleDeleteAll}
            disabled={isDeleting}
            className="p-1 bg-red-500 hover:bg-red-600 rounded text-white transition-colors disabled:opacity-50"
          >
            <Check className="h-3 w-3" />
          </button>
          <button
            onClick={() => setIsConfirming(false)}
            className="p-1 bg-slate-600 hover:bg-slate-700 rounded text-slate-300 transition-colors"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setIsConfirming(true)}
      disabled={companions.length === 0}
      className="flex items-center gap-2 px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-300 rounded-lg text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
};
