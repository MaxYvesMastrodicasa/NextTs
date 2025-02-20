"use client";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateCourse, createCourse, deleteCourse } from "@/app/lib/data";
import {
    PencilIcon,
    CheckIcon,
    XMarkIcon,
    TrashIcon,
    PlusCircleIcon,
} from "@heroicons/react/24/outline";

export default function CoursesTable({ courses, teachers, currentPage }: { courses: any[], teachers: any[], currentPage: number }) {
    const router = useRouter();
    const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newCourse, setNewCourse] = useState({
        title: "",
        description: "",
        instrument: "",
        teacherId: "",
        level: "",
        schedule: "",
        capacity: 0,
    });

    const [editValues, setEditValues] = useState(
        Object.fromEntries(
            courses.map((course) => [
                course.id,
                {
                    title: course.title,
                    description: course.description,
                    instrument: course.instrument,
                    teacherId: course.teacherId || "",
                    level: course.level,
                    schedule: course.schedule,
                    capacity: course.capacity,
                },
            ])
        )
    );

    const handleEditClick = (courseId: string) => {
        setEditingCourseId(courseId);
    };

    const handleCancel = () => {
        setEditingCourseId(null);
        setIsModalOpen(false);
        setNewCourse({
            title: "",
            description: "",
            instrument: "",
            teacherId: "",
            level: "",
            schedule: "",
            capacity: 0,
        });
    };

    const handleChange = (courseId: string, field: string, value: string | number) => {
        setEditValues((prev: { [x: string]: any; }) => ({
            ...prev,
            [courseId]: { ...prev[courseId], [field]: value },
        }));
    };

    const handleSave = async (courseId: string) => {
        await updateCourse(courseId, editValues[courseId]);
        toast.success("Cours mis à jour avec succès !");
        setEditingCourseId(null);
        router.refresh();
    };

    const handleDelete = async (courseId: string) => {
        if (confirm("Êtes-vous sûr de vouloir supprimer ce cours ?")) {
            await deleteCourse(courseId);
            toast.success("Cours supprimé avec succès !", { icon: "🗑️" });
            router.refresh();
        }
    };

    const handleNewCourseChange = (field: string, value: string | number) => {
        setNewCourse((prev) => ({ ...prev, [field]: value }));
    };

    const handleAddCourse = async () => {
        if (!newCourse.title || !newCourse.description || !newCourse.instrument || !newCourse.teacherId || !newCourse.level || !newCourse.schedule || newCourse.capacity <= 0) {
            toast.error("Veuillez remplir tous les champs !");
            return;
        }

        await createCourse(newCourse);
        toast.success("Cours ajouté avec succès !");
        setIsModalOpen(false);
        router.refresh();
    };

    return (
        <div>
            {currentPage === 1 && (
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded mb-3 flex items-center"
                >
                    <PlusCircleIcon className="h-5 w-5 mr-2" />
                    Add a course
                </button>
            )}

            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="py-2 px-4 text-left">Title</th>
                        <th className="py-2 px-4 text-left">Instrument</th>
                        <th className="py-2 px-4 text-left">Level</th>
                        <th className="py-2 px-4 text-left">Teacher</th>
                        <th className="py-2 px-4 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course) => (
                        <tr key={course.id} className="border-b">
                            {editingCourseId === course.id ? (
                                <>
                                    <td className="py-2 px-4">
                                        <input type="text" value={editValues[course.id]?.title || ""} onChange={(e) => handleChange(course.id, "title", e.target.value)} className="border p-1 rounded w-full" />
                                    </td>
                                    <td className="py-2 px-4">
                                        <input type="text" value={editValues[course.id]?.instrument || ""} onChange={(e) => handleChange(course.id, "instrument", e.target.value)} className="border p-1 rounded w-full" />
                                    </td>
                                    <td className="py-2 px-4">
                                        <input type="text" value={editValues[course.id]?.level || ""} onChange={(e) => handleChange(course.id, "level", e.target.value)} className="border p-1 rounded w-full" />
                                    </td>
                                    <td className="py-2 px-4">
                                        <select value={editValues[course.id]?.teacherId || ""} onChange={(e) => handleChange(course.id, "teacherId", e.target.value)} className="border p-1 rounded w-full">
                                            <option value="">Choose a teacher</option>
                                            {teachers.map((teacher) => (
                                                <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="py-2 px-4 flex space-x-2">
                                        <button onClick={() => handleSave(course.id)} className="bg-green-500 text-white p-2 rounded">
                                            <CheckIcon className="h-5 w-5" />
                                        </button>
                                        <button onClick={handleCancel} className="bg-red-500 text-white p-2 rounded">
                                            <XMarkIcon className="h-5 w-5" />
                                        </button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td className="py-2 px-4">{course.title}</td>
                                    <td className="py-2 px-4">{course.instrument}</td>
                                    <td className="py-2 px-4">{course.level}</td>
                                    <td className="py-2 px-4">{course.teacher_name || "Non attribué"}</td>
                                    <td className="py-2 px-4 flex space-x-2">
                                        <button onClick={() => handleEditClick(course.id)} className="bg-blue-500 text-white p-2 rounded">
                                            <PencilIcon className="h-5 w-5" />
                                        </button>
                                        <button onClick={() => handleDelete(course.id)} className="bg-gray-500 text-white p-2 rounded">
                                            <TrashIcon className="h-5 w-5" />
                                        </button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>

            <Toaster position="top-right" reverseOrder={false} />
        </div>
    );
}
