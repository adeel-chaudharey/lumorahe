"use client";

import { useState } from "react";
import { updateOrder } from "@/app/admin/orders/actions";

interface Props {
  order: {
    id: string;
    payment_status: string;
    fulfillment_status: string;
    tracking_number: string | null;
    notes: string | null;
  };
}

export default function OrderStatusForm({
  order,
}: Props) {
  const [payment, setPayment] = useState(order.payment_status);
  const [fulfillment, setFulfillment] = useState(order.fulfillment_status);
  const [tracking, setTracking] = useState(order.tracking_number ?? "");
  const [notes, setNotes] = useState(order.notes ?? "");

  async function handleSave() {
    await updateOrder(order.id, {
      payment_status: payment,
      fulfillment_status: fulfillment,
      tracking_number: tracking,
      notes,
    });

    alert("Order updated!");
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-xl font-semibold text-white">
        Update Order
      </h2>

      <div className="space-y-4">
        <select
          value={payment}
          onChange={(e) => setPayment(e.target.value)}
          className="w-full rounded-lg bg-slate-800 p-3"
        >
          <option>Pending</option>
          <option>Paid</option>
          <option>Failed</option>
          <option>Refunded</option>
        </select>

        <select
          value={fulfillment}
          onChange={(e) => setFulfillment(e.target.value)}
          className="w-full rounded-lg bg-slate-800 p-3"
        >
          <option>Unfulfilled</option>
          <option>Processing</option>
          <option>Shipped</option>
          <option>Delivered</option>
        </select>

        <input
          value={tracking}
          onChange={(e) => setTracking(e.target.value)}
          placeholder="Tracking Number"
          className="w-full rounded-lg bg-slate-800 p-3"
        />

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Notes"
          rows={4}
          className="w-full rounded-lg bg-slate-800 p-3"
        />

        <button
          onClick={handleSave}
          className="rounded-lg bg-emerald-600 px-5 py-3 font-semibold hover:bg-emerald-500"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}