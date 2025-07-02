"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

// Mock fetch function (replace with real data fetching logic)
const mockQuiz = {
  id: "1",
  name: "General Knowledge Quiz",
  room: "Room 101",
  winner: "Alice",
  numPlayers: 10,
  numQuestions: 15,
  animation: 2,
  duration: 30,
  status: "active",
  startDateTime: "2024-06-01T10:00:00Z",
  endDateTime: "2024-06-01T10:30:00Z",
};

export default function QuizDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  // TODO: Fetch quiz by id
  const quiz = mockQuiz; // Replace with fetched data
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
      <div className="w-full max-w-xl">
        <Card className="mb-6 shadow-lg border-primary/30 border-2">
          <CardHeader>
            <CardTitle className="text-2xl font-bold mb-2">
              {quiz.name}
            </CardTitle>
            <div className="flex gap-2 text-sm text-muted-foreground">
              <span>
                Room: <b>{quiz.room}</b>
              </span>
              <span>
                Status: <b>{quiz.status}</b>
              </span>
              <span>
                Winner: <b>{quiz.winner}</b>
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-muted rounded p-2">
                  Questions: {quiz.numQuestions}
                </div>
                <div className="bg-muted rounded p-2">
                  Players: {quiz.numPlayers}
                </div>
                <div className="bg-muted rounded p-2">
                  Animation: {quiz.animation}
                </div>
                <div className="bg-muted rounded p-2">
                  Duration: {quiz.duration} min
                </div>
              </div>
              <div className="mt-4 flex gap-4 text-sm">
                <span>
                  Start: <b>{quiz.startDateTime}</b>
                </span>
                <span>
                  End: <b>{quiz.endDateTime}</b>
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Panel for edit/delete */}
        <div className="flex gap-4 justify-end">
          <Button
            variant="outline"
            onClick={() => router.push(`/quiz/edit/${quiz.id}`)}
          >
            Edit
          </Button>
          <Button
            variant="destructive"
            onClick={() => setShowDeleteModal(true)}
          >
            Delete
          </Button>
        </div>
      </div>
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-6">
              Are you sure you want to delete this quiz? This action cannot be
              undone.
            </p>
            <div className="flex gap-4 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  // TODO: Delete logic
                  setShowDeleteModal(false);
                  router.push("/quiz");
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
