"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Search, MoreVertical, ChevronRight } from "lucide-react";
import { WDXL_Lubrifont_SC } from "next/font/google";

export default function WorkspacesPage() {
  const [workspaceList, setWorkspaceList] = useState<Array<{ id: string; agent: string; status: string; agentStatus?: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch workspaces from database on page load
  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/workspaces");
        if (!res.ok) throw new Error("Failed to fetch workspaces");
        const data = await res.json();
        console.log("Fetched data from API:", data);
        setWorkspaceList(data.workspaces);
        setError(null);
      } catch (err) {
        console.error("Error fetching workspaces:", err);
        setError("Failed to load workspaces");
      } finally {
        setLoading(false);
      }
    };
      
    fetchWorkspaces();
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [openStatusId, setOpenStatusId] = useState<string | null>(null);

  const filteredWorkspaces = workspaceList
    .filter((workspace) =>
      workspace.agent.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      // Sort by ID numerically if both are numbers, otherwise alphabetically
      const aId = parseInt(a.id, 10);
      const bId = parseInt(b.id, 10);
      if (!isNaN(aId) && !isNaN(bId)) {
        return aId - bId;
      }
      return a.id.localeCompare(b.id);
    });

  const totalPages = Math.ceil(filteredWorkspaces.length / itemsPerPage);
  const paginatedWorkspaces = filteredWorkspaces.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleStatusSelect = async (
    workspaceId: string,
    action: "login" | "logout" | "ready" | "pause" | "in-call"
  ) => {
    try {
      console.log(`Updating workspace ${workspaceId} with action ${action}`);
      // Call backend API
      const res = await fetch("/api/workspaces", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workspaceId, action }),
      });

      const data = await res.json();
      console.log("API Response:", data);
      if (!res.ok) {
        console.error(data.error);
        return;
      }

      // Update local state with response
      setWorkspaceList((prev) =>
        prev.map((w) =>
          w.id === workspaceId
            ? {
                ...w,
                status: data.workspace.status,
                agentStatus: data.workspace.agent_status,
              }
            : w
        )
      );
      console.log("Updated state successfully");
    } catch (err) {
      console.error("Error updating status:", err);
    }
    setOpenMenuId(null);
    setOpenStatusId(null);
  };

  const getVisiblePages = (current: number, total: number, maxVisible = 5) => {
    const pages: (number | string)[] = [];
    if (total <= maxVisible) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      const left = Math.max(current - 1, 2);
      const right = Math.min(current + 1, total - 1);
      pages.push(1);
      if (left > 2) pages.push("…");
      for (let i = left; i <= right; i++) pages.push(i);
      if (right < total - 1) pages.push("…");
      pages.push(total);
    }
    return pages;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Agent Management</h1>
          <p className="text-muted-foreground">
            Manage all customer agent management and organizations
          </p>
        </div>
      </div>

      {error && (
        <Card className="border-destructive bg-destructive/10">
          <CardContent className="pt-6">
            <p className="text-destructive font-semibold">{error}</p>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-center">Loading workspaces...</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle></CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative w-72">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search agent management..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="pl-9"
                  />
                </div>
              </div>
            </div>
        </CardHeader>

        <CardContent className="overflow-visible">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Agent-status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedWorkspaces.map((workspace) => (
                <TableRow key={workspace.id}>
                  <TableCell>
                    <div className="font-medium">{workspace.agent}</div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={workspace.status === "active" ? "default" : "secondary"}
                      className={
                        workspace.status === "active"
                          ? "bg-success text-success-foreground"
                          : workspace.status === "suspended"
                          ? "bg-destructive text-destructive-foreground"
                          : "bg-muted text-muted-foreground"
                      }
                    >
                      {workspace.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="default"
                      className={
                        (workspace.agentStatus || "READY") === "READY"
                          ? "bg-success text-success-foreground"
                          : (workspace.agentStatus || "READY") === "PAUSE"
                          ? "bg-yellow-600 text-white"
                          : (workspace.agentStatus || "READY") === "IN-CALL"
                          ? "bg-blue-600 text-white"
                          : "bg-muted text-muted-foreground"
                      }
                    >
                      {workspace.agentStatus || "READY"}
                    </Badge>
                  </TableCell>
                  <TableCell className="relative">
                    <DropdownMenu
                      open={openMenuId === workspace.id}
                      onOpenChange={(open) => {
                        if (open) setOpenMenuId(workspace.id);
                        else {
                          setOpenMenuId(null);
                          setOpenStatusId(null);
                        }
                      }}
                    >
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end" className="w-48 overflow-visible">
                        <DropdownMenuItem onSelect={() => handleStatusSelect(workspace.id, "login")}>
                          Login
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => handleStatusSelect(workspace.id, "logout")}>
                          Logout
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className={`flex justify-between ${
                            workspace.status !== "active"
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                          disabled={workspace.status !== "active"}
                          onSelect={(e) => {
                            e.preventDefault();
                            if (workspace.status === "active") {
                              setOpenStatusId(openStatusId === workspace.id ? null : workspace.id);
                            }
                          }}
                        >
                          Agent Status
                          <ChevronRight className="h-4 w-4" />
                        </DropdownMenuItem>

                        {workspace.status !== "active" && (
                          <div className="px-3 py-2 text-xs text-muted-foreground">
                            Login to change agent status
                          </div>
                        )}

                        {openStatusId === workspace.id && workspace.status === "active" && (
                          <div className="absolute top-18 left-full ml-2 w-40 rounded-md bg-popover border border-border text-[14px] shadow-lg z-50">
                            <button
                              className="block w-full px-3 py-2 text-left hover:bg-accent hover:text-accent-foreground"
                              onClick={() => handleStatusSelect(workspace.id, "ready")}
                            >
                              READY
                            </button>
                            <button
                              className="block w-full px-3 py-2 text-left hover:bg-accent hover:text-accent-foreground"
                              onClick={() => handleStatusSelect(workspace.id, "pause")}
                            >
                              PAUSE
                            </button>
                            <button
                              className="block w-full px-3 py-2 text-left hover:bg-accent hover:text-accent-foreground"
                              onClick={() => handleStatusSelect(workspace.id, "in-call")}
                            >
                              IN-CALL
                            </button>
                          </div>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex justify-center items-center space-x-2 mt-4">
            <Button
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Prev
            </Button>

            {getVisiblePages(currentPage, totalPages).map((page, idx) =>
              typeof page === "string" ? (
                <span key={`ellipsis-${idx}`} className="px-2">
                  …
                </span>
              ) : (
                <Button
                  key={page}
                  size="sm"
                  variant={page === currentPage ? "default" : "outline"}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              )
            )}

            <Button
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
      )}
    </div>
  );
}
