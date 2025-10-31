"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import qrpic from "../../../public/qrpic.jpg";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import axios from "axios";

import toast from "react-hot-toast";

export default function MembershipPage() {
  const [fullName, setFullName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [occupation, setOccupation] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [membershipTier, setMembershipTier] = useState<
    "silver" | "gold" | "platinum"
  >("silver");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const tierPrices: Record<string, string> = {
    silver: "$50",
    gold: "$100",
    platinum: "$250",
  };

  function handlePhotoChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) {
      setPhotoFile(null);
      setPhotoPreview(null);
      return;
    }
    setPhotoFile(file);

    const reader = new FileReader();
    reader.onload = () => setPhotoPreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMsg(null);

    if (!fullName.trim() || !contactNumber.trim()) {
      alert("Please fill at least Full Name and Contact Number.");
      setSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("fatherName", fatherName);
    formData.append("occupation", occupation);
    formData.append("address", address);
    formData.append("contactNumber", contactNumber);
    formData.append("membershipTier", membershipTier);
    if (photoFile) formData.append("photo", photoFile);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/membership`,
        formData,

        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSuccessMsg(
        `Membership application submitted — ${membershipTier.toUpperCase()} (${
          tierPrices[membershipTier]
        })`
      );
      toast.success("success")
      setFullName("");
      setFatherName("");
      setOccupation("");
      setAddress("");
      setContactNumber("");
      setPhotoFile(null);
      setPhotoPreview(null);
      setMembershipTier("silver");
    } catch (err) {
      console.error(err);
      toast.error("There was an error submitting the form.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-yellow-50 py-10 px-4">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
        {/* LEFT SECTION - QR Info */}
        <Card className="shadow-lg border-amber-100">
          <CardContent className="flex flex-col items-center text-center p-8">
            <h2 className="text-2xl font-bold text-orange-700">
              World Hindu Vision
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Become a member and support our mission to promote unity and
              culture.
            </p>

            <div className="mt-6 w-48 h-48 rounded-xl overflow-hidden border shadow-md">
              <Image
                src={qrpic}
                alt="QR Code"
                className="object-cover w-full h-full"
              />
            </div>

            <div className="mt-4 space-y-1 text-sm text-slate-700">
              <p>Scan to pay or save the QR for later.</p>
              <p className="font-semibold mt-3">Membership tiers:</p>
              <ul className="space-y-1">
                <li>🥈 Silver — $50</li>
                <li>🥇 Gold — $100</li>
                <li>💎 Platinum — $250</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* RIGHT SECTION - Form */}
        <Card className="lg:col-span-2 shadow-lg border-amber-100">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-xl font-semibold text-orange-700 mb-4">
                Membership Application Form
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label>Full Name</Label>
                  <Input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder=""
                    required
                  />
                </div>

                <div>
                  <Label>Father's Name</Label>
                  <Input
                    value={fatherName}
                    onChange={(e) => setFatherName(e.target.value)}
                    placeholder=""
                  />
                </div>

                <div>
                  <Label>Occupation</Label>
                  <Input
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                    placeholder=""
                  />
                </div>

                <div>
                  <Label>Contact Number</Label>
                  <Input
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    placeholder=""
                    required
                  />
                </div>
              </div>

              <div>
                <Label>Address</Label>
                <Textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder=""
                />
              </div>

              {/* Photo Upload */}
              <div className="grid sm:grid-cols-2 gap-4 items-center">
                <div>
                  <Label>Upload Photo</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                  />
                </div>
                <div className="flex items-center gap-4">
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="w-24 h-24 object-cover rounded-md border"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-gray-100 rounded-md flex items-center justify-center text-xs text-slate-400">
                      No photo
                    </div>
                  )}
                  <span className="text-xs text-slate-500">
                    JPG/PNG only, max 5MB (check server-side).
                  </span>
                </div>
              </div>

              {/* Membership Tier */}
              <div className="border border-gray-200 rounded-md p-4">
                <Label className="text-sm font-medium">
                  Choose Membership Tier
                </Label>
                <div className="mt-3 grid sm:grid-cols-3 gap-3">
                  {(["silver", "gold", "platinum"] as const).map((tier) => (
                    <label
                      key={tier}
                      className={`p-3 rounded-lg border cursor-pointer text-center transition ${
                        membershipTier === tier
                          ? "border-orange-500 bg-orange-50"
                          : "border-gray-200 hover:border-orange-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="tier"
                        value={tier}
                        checked={membershipTier === tier}
                        onChange={() => setMembershipTier(tier)}
                        className="hidden"
                      />
                      <div className="font-semibold capitalize">{tier}</div>
                      <div className="text-xs text-slate-600">
                        {tierPrices[tier]}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-700">
                  Selected: <strong>{membershipTier.toUpperCase()}</strong> —{" "}
                  {tierPrices[membershipTier]}
                </p>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  {submitting ? "Submitting..." : "Submit Membership"}
                </Button>
              </div>

              {successMsg && (
                <div className="rounded-md bg-green-50 border border-green-200 p-3 text-sm text-green-700">
                  {successMsg}
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
