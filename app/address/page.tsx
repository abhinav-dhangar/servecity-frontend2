"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

import { useGetAddresses } from "@/hooks/address/useGetAddresses";
import { useAddAddress } from "@/hooks/address/useAddAddress";
import { useEditAddress } from "@/hooks/address/useEditAddress";
import { useDeleteAddress } from "@/hooks/address/useDeleteAddress";

// ---------------- STATES ---------------- //
const states: string[] = [
  "Andhra Pradesh",
  "Assam",
  "Bihar",
  "Delhi",
  "Gujarat",
  "Haryana",
  "Karnataka",
  "Kerala",
  "Maharashtra",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "West Bengal",
];

// ---------------- MAIN PAGE ---------------- //
export default function AddressPage() {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    roadStreet: "",
    landmark: "",
    pinCode: "",
    city: "",
    state: "",
  });

  const { data, isLoading, isError } = useGetAddresses();
  const addMutation = useAddAddress();
  const editMutation = useEditAddress();
  const deleteMutation = useDeleteAddress();

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  // ---------------- ADD ADDRESS ---------------- //
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // ❌ CLIENT VALIDATION
    if (!form.fullName || !form.phone || !form.pinCode || !form.state) {
      toast.error("Full Name, Phone, Pincode and State are required");
      return;
    }

    addMutation.mutate(
      {
        fullName: form.fullName.trim(),
        phone: String(form.phone),
        street: form.roadStreet.trim(),
        landmark: form.landmark.trim(),
        pinCode: String(form.pinCode),
        city: form.city.trim(),
        state: form.state,
      },
      {
        onSuccess: () => {
          toast.success("Address added successfully");

          setForm({
            fullName: "",
            phone: "",
            roadStreet: "",
            landmark: "",
            pinCode: "",
            city: "",
            state: "",
          });
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message || "Failed to add address"
          );
        },
      }
    );
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* ADD FORM */}
      <div className="mt-10 w-full max-w-md rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold">Add New Address</h2>
        <p className="mt-1 text-sm text-neutral-600">
          Enter your delivery address
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <Field label="Full Name">
            <Input
              value={form.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
            />
          </Field>

          <Field label="Phone">
            <Input
              type="number"
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </Field>

          <Field label="Street">
            <Input
              value={form.roadStreet}
              onChange={(e) => handleChange("roadStreet", e.target.value)}
            />
          </Field>

          <Field label="Landmark">
            <Input
              value={form.landmark}
              onChange={(e) => handleChange("landmark", e.target.value)}
            />
          </Field>

          <Field label="Pincode">
            <Input
              type="number"
              value={form.pinCode}
              onChange={(e) => handleChange("pinCode", e.target.value)}
            />
          </Field>

          <Field label="City">
            <Input
              value={form.city}
              onChange={(e) => handleChange("city", e.target.value)}
            />
          </Field>

          <Field label="State">
            <Select
              value={form.state}
              onValueChange={(value) => handleChange("state", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>States</SelectLabel>
                  {states.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>

          <Button
            type="submit"
            disabled={addMutation.isLoading}
            className="w-full"
          >
            {addMutation.isLoading ? "Saving..." : "Save Address"}
          </Button>
        </form>
      </div>

      {/* ADDRESS LIST */}
      <div className="w-full max-w-md mt-10">
        <h2 className="text-lg font-bold mb-4">Your Addresses</h2>

        {isLoading && <p className="text-sm">Loading addresses...</p>}

        {isError && (
          <p className="text-sm text-red-600">Failed to load addresses</p>
        )}

        {data?.length === 0 && (
          <p className="text-sm text-neutral-500">No addresses added</p>
        )}

        {data?.map((addr: any) => (
          <AddressCard
            key={addr.id}
            addr={addr}
            editMutation={editMutation}
            deleteMutation={deleteMutation}
          />
        ))}
      </div>
    </div>
  );
}

// ---------------- FIELD ---------------- //
function Field({ label, children }: any) {
  return (
    <div className="flex flex-col space-y-1">
      <Label>{label}</Label>
      {children}
    </div>
  );
}
function AddressCard({ addr, editMutation, deleteMutation }: any) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [form, setForm] = useState({
    fullName: addr.fullName || "",
    phone: addr.phone || "",
    roadStreet: addr.roadStreet || "",
    landmark: addr.landmark || "",
    pinCode: addr.pinCode || "",
    city: addr.city || "",
    state: addr.state || "",
  });

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const saveChanges = () => {
    // ❌ Validation
    if (!form.fullName || !form.phone || !form.pinCode || !form.state) {
      toast.error("Full Name, Phone, Pincode and State are required");
      return;
    }

    // ✅ Send only changed fields
    const updates: any = { addressId: addr.id };

    if (form.fullName !== addr.fullName)
      updates.fullName = form.fullName.trim();

    if (form.phone !== addr.phone) updates.phone = String(form.phone);

    if (form.roadStreet !== addr.roadStreet)
      updates.roadStreet = form.roadStreet.trim();

    if (form.landmark !== addr.landmark)
      updates.landmark = form.landmark.trim();

    if (form.pinCode !== addr.pinCode) updates.pinCode = String(form.pinCode);

    if (form.city !== addr.city) updates.city = form.city.trim();

    if (form.state !== addr.state) updates.state = form.state;

    // ❌ No changes
    if (Object.keys(updates).length === 1) {
      toast.message("No changes detected");
      setIsEditing(false);
      return;
    }

    setIsSaving(true);

    editMutation.mutate(updates, {
      onSuccess: () => {
        toast.success("Address updated successfully");
        setIsEditing(false);
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message || "Failed to update address"
        );
      },
      onSettled: () => setIsSaving(false),
    });
  };

  return (
    <div className="border rounded-lg p-4 mb-4">
      {isEditing ? (
        <div className="space-y-2">
          <Input
            placeholder="Full Name"
            value={form.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
          />

          <Input
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />

          <Input
            placeholder="Road / Street"
            value={form.roadStreet}
            onChange={(e) => handleChange("roadStreet", e.target.value)}
          />

          <Input
            placeholder="Landmark"
            value={form.landmark}
            onChange={(e) => handleChange("landmark", e.target.value)}
          />

          <Input
            placeholder="Pincode"
            value={form.pinCode}
            onChange={(e) => handleChange("pinCode", e.target.value)}
          />

          <Input
            placeholder="City"
            value={form.city}
            onChange={(e) => handleChange("city", e.target.value)}
          />

          <Input
            placeholder="State"
            value={form.state}
            onChange={(e) => handleChange("state", e.target.value)}
          />

          <div className="flex gap-3 pt-2">
            <Button size="sm" onClick={saveChanges} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save"}
            </Button>

            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsEditing(false)}
              disabled={isSaving}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <>
          <p className="font-medium">{addr.fullName}</p>
          <p className="text-sm text-neutral-600">
            {addr.roadStreet}, {addr.city}
          </p>
          <p className="text-sm text-neutral-600">
            {addr.state} - {addr.pinCode}
          </p>

          <div className="flex gap-4 mt-3">
            <Button size="sm" variant="link" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
            <Button
              size="sm"
              variant="link"
              className="text-red-600"
              onClick={() =>
                deleteMutation.mutate(addr.id, {
                  onSuccess: () => toast.success("Address deleted"),
                  onError: () => toast.error("Failed to delete address"),
                })
              }
            >
              Delete
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
