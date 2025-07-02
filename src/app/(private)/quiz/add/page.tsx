"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import FormCard from "@/components/FormCard";
import { QuizFormSchema, QuizFormData } from "@/schema";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AddQuizPage() {
  const router = useRouter();
  const [form, setForm] = useState<QuizFormData>({
    name: "",
    room: "",
    numQuestions: 1,
    duration: 10,
    animation: 1,
    quizDate: "",
    status: "pending",
    startTime: "",
    endTime: "",
    winner: "",
    numPlayers: undefined,
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm({ ...form, [name]: type === "number" ? Number(value) : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const result = QuizFormSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    // TODO: Add logic to save the quiz (API call or state update)
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <FormCard
          title="Quiz Created!"
          description="Your new quiz has been added."
          showSubmitButton={false}
        >
          <div className="flex gap-4 mt-4">
            <Button onClick={() => {
              setForm({
                name: "",
                room: "",
                numQuestions: 1,
                duration: 10,
                animation: 1,
                quizDate: "",
                status: "pending",
                startTime: "",
                endTime: "",
                winner: "",
                numPlayers: undefined,
              });
              setSubmitted(false);
              setErrors({});
            }}>
              Create Another
            </Button>
            <Button variant="secondary" onClick={() => router.push("/quiz")}>Return to Quizzes</Button>
          </div>
        </FormCard>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <form onSubmit={handleSubmit} className="w-full flex justify-center">
        <FormCard
          title="Add New Quiz"
          description="Fill out the form to add a new quiz."
          showSubmitButton={true}
          submitText="Create Quiz"
          onSubmit={handleSubmit}
          error={Object.values(errors)[0]}
        >
          <Input
            name="name"
            placeholder="Quiz Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          {errors.name && <div className="text-red-500 text-xs">{errors.name}</div>}
          <Input
            name="room"
            placeholder="Room"
            value={form.room}
            onChange={handleChange}
            required
          />
          {errors.room && <div className="text-red-500 text-xs">{errors.room}</div>}
          <Input
            name="numQuestions"
            type="number"
            placeholder="Number of Questions"
            value={form.numQuestions}
            onChange={handleChange}
            required
            min={1}
          />
          {errors.numQuestions && <div className="text-red-500 text-xs">{errors.numQuestions}</div>}
          <Input
            name="duration"
            type="number"
            placeholder="Duration (minutes)"
            value={form.duration}
            onChange={handleChange}
            required
            min={1}
          />
          {errors.duration && <div className="text-red-500 text-xs">{errors.duration}</div>}
          <Input
            name="animation"
            type="number"
            placeholder="Animation"
            value={form.animation}
            onChange={handleChange}
            required
            min={1}
          />
          {errors.animation && <div className="text-red-500 text-xs">{errors.animation}</div>}
          <Input
            name="quizDate"
            type="date"
            placeholder="Quiz Date"
            value={form.quizDate}
            onChange={handleChange}
            required
          />
          {errors.quizDate && <div className="text-red-500 text-xs">{errors.quizDate}</div>}
          <Input
            name="startTime"
            type="time"
            placeholder="Start Time"
            value={form.startTime}
            onChange={handleChange}
            required
          />
          {errors.startTime && <div className="text-red-500 text-xs">{errors.startTime}</div>}
          <Input
            name="endTime"
            type="time"
            placeholder="End Time"
            value={form.endTime}
            onChange={handleChange}
            required
          />
          {errors.endTime && <div className="text-red-500 text-xs">{errors.endTime}</div>}
          <Input
            name="winner"
            placeholder="Winner (optional)"
            value={form.winner || ""}
            onChange={handleChange}
          />
          {errors.winner && <div className="text-red-500 text-xs">{errors.winner}</div>}
          <Input
            name="numPlayers"
            type="number"
            placeholder="Number of Players (optional)"
            value={form.numPlayers === undefined ? "" : form.numPlayers}
            onChange={handleChange}
          />
          {errors.numPlayers && <div className="text-red-500 text-xs">{errors.numPlayers}</div>}
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="pending">Pending</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
          {errors.status && <div className="text-red-500 text-xs">{errors.status}</div>}
        </FormCard>
      </form>
    </div>
  );
} 