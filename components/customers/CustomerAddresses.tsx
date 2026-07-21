import { Address } from "@/app/admin/customers/types";
import { MapPin } from "lucide-react";

interface Props {
  addresses: Address[];
}

export default function CustomerAddresses({
  addresses,
}: Props) {
  if (!addresses.length) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="mb-4 text-xl font-semibold text-white">
          Addresses
        </h2>

        <p className="text-slate-400">
          No addresses found.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-xl font-semibold text-white">
        Addresses
      </h2>

      <div className="space-y-4">
        {addresses.map((address) => (
          <div
            key={address.id}
            className="rounded-xl border border-slate-700 p-5"
          >
            <div className="mb-3 flex items-center gap-2">
              <MapPin
                size={18}
                className="text-emerald-400"
              />

              <span className="font-semibold text-white">
                {address.full_name}
              </span>

              {address.is_default && (
                <span className="rounded-full bg-emerald-600 px-2 py-1 text-xs">
                  Default
                </span>
              )}
            </div>

            <p>{address.address_line1}</p>

            {address.address_line2 && (
              <p>{address.address_line2}</p>
            )}

            <p>
              {address.city}
              {address.state ? `, ${address.state}` : ""}
            </p>

            <p>
              {address.country}
              {address.postal_code
                ? ` - ${address.postal_code}`
                : ""}
            </p>

            {address.phone && (
              <p className="mt-2 text-slate-400">
                {address.phone}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}