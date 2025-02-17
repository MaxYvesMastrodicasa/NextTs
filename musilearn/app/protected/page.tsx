"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ProtectedPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated" && session?.user?.role) {
            const allowedPath = `/${session.user.role}`;
            if (!window.location.pathname.startsWith(allowedPath)) {
                router.push(allowedPath);
            }
        }
    }, [session, status, router]);

    if (status === "loading") return <div>Loading...</div>;

    return (
        <div>
            Contenu protégé pour l'utilisateur avec le rôle: {session?.user?.role}
        </div>
    );
}
