"use client";

import { useState } from "react";
import { useDownloadInvoice } from "@/hooks/orders/useDownloadInvoice";

interface Props {
  orderId: number;
  orderStatus: string;
}

export default function DownloadInvoiceCard({ orderId, orderStatus }: Props) {
  const { mutate: downloadInvoice, isPending } = useDownloadInvoice();

  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  if (orderStatus !== "Delivered") return null;

  const handleClick = () => {
    // ✅ If already generated → just download
    if (downloadUrl) {
      window.open(downloadUrl, "_blank");
      return;
    }

    // ⏳ Otherwise generate
    downloadInvoice(orderId, {
      onSuccess: (data) => {
        setDownloadUrl(data.downloadUrl);
        window.open(data.downloadUrl, "_blank");
      },
      onError: () => {
        alert("Failed to generate invoice");
      },
    });
  };

  return (
    <div className="border rounded-xl p-4 bg-white flex items-center justify-between">
      <div>
        <h3 className="text-sm font-semibold">Invoice</h3>
        <p className="text-xs text-neutral-500">
          {downloadUrl
            ? "Invoice generated successfully"
            : "Generate and download your invoice"}
        </p>
      </div>

      <button
        onClick={handleClick}
        disabled={isPending}
        className={`px-4 py-2 text-sm rounded-lg border flex items-center gap-2 transition
          ${
            isPending
              ? "bg-neutral-100 text-neutral-400 cursor-not-allowed"
              : downloadUrl
              ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
              : "bg-white hover:bg-neutral-100"
          }`}
      >
        {/* Spinner */}
        {isPending && (
          <span className="h-4 w-4 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin" />
        )}

        {/* Button text */}
        {!isPending && !downloadUrl && "Generate Invoice"}
        {isPending && "Generating…"}
        {!isPending && downloadUrl && "Generated · Download"}

        {/* Arrow */}
        {!isPending && downloadUrl && <span className="ml-1 text-lg">→</span>}
      </button>
    </div>
  );
}
