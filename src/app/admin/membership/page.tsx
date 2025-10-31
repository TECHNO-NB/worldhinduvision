"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";

type Member = {
  id: string;
  fullName: string;
  membershipTier: "SILVER" | "GOLD" | "PLATINUM";
  contactNumber: string;
  address: string;
  photoUrl: string;
};

export default function MembershipAdmin() {
  const [members, setMembers] = useState<Member[]>([
 
  ]);

  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchAllMemberships = async () => {
      try {
        const allMemberships = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/get-all-membership`
        );

        if (allMemberships.data.status === 200) {
          setMembers(allMemberships.data.data);
          toast.success("successfully fetch all memberships");
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch memberships");
      }
    };
    fetchAllMemberships();
  }, []);

  const handleDelete = (member: Member) => {
    setSelectedMember(member);
    setOpenDialog(true);
  };

  const confirmDelete = async () => {
    try {
      if (selectedMember) {
        const res = await axios.delete(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/delete-membership/${selectedMember.id}`
        );
        if (res.data.status === 200) {
          setMembers((prev) => prev.filter((m) => m.id !== selectedMember.id));
          setSelectedMember(null);
          setOpenDialog(false);
          toast.success("Delete successfully");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete Membership");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Membership Admin Panel</h1>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Members</TabsTrigger>
       
        </TabsList>

        {/* --- All Members Tab --- */}
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">All Members</h2>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Photo</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Tier</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {members.length < 0 && <h1>No memberships data !!</h1>}
                  {members.map((m) => (
                    <TableRow key={m.id}>
                      <TableCell>
                        <Image
                          src={m.photoUrl}
                          alt={m.fullName}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      </TableCell>
                      <TableCell>{m.fullName}</TableCell>
                      <TableCell>{m.membershipTier}</TableCell>
                      <TableCell>{m.contactNumber}</TableCell>
                      <TableCell>{m.address}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(m)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

       
      </Tabs>

      {/* --- Delete Confirmation Modal --- */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <p>
            Are you sure you want to delete{" "}
            <span className="font-semibold">{selectedMember?.fullName}</span>?
          </p>
          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
