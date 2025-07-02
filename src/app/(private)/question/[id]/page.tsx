"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

// Mock fetch function (replace with real data fetching logic)
const mockQuestion = {
  id: "1",
  question: "What is the capital of France?",
  optionOne: "Paris",
  optionTwo: "London",
  optionThree: "Berlin",
  optionFour: "Madrid",
  answer: "Paris",
  timer: 30,
  score: 10,
  questionType: "multiple-choice",
  category: "Geography",
  difficulty: "Easy",
};

export default function QuestionDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  // TODO: Fetch question by id
  const question = mockQuestion; // Replace with fetched data
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
      <div className="w-full max-w-xl">
        <Card className="mb-6 shadow-lg border-primary/30 border-2">
          <CardHeader>
            <CardTitle className="text-2xl font-bold mb-2">
              {question.question}
            </CardTitle>
            <div className="flex gap-2 text-sm text-muted-foreground">
              <span>
                Category: <b>{question.category}</b>
              </span>
              <span>
                Difficulty: <b>{question.difficulty}</b>
              </span>
              <span>
                Type: <b>{question.questionType}</b>
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-muted rounded p-2">
                  A. {question.optionOne}
                </div>
                <div className="bg-muted rounded p-2">
                  B. {question.optionTwo}
                </div>
                <div className="bg-muted rounded p-2">
                  C. {question.optionThree}
                </div>
                <div className="bg-muted rounded p-2">
                  D. {question.optionFour}
                </div>
              </div>
              <div className="mt-4">
                <span className="font-semibold">Answer:</span>{" "}
                <span className="text-primary font-bold">
                  {question.answer}
                </span>
              </div>
              <div className="flex gap-4 mt-2 text-sm">
                <span>
                  Timer: <b>{question.timer}s</b>
                </span>
                <span>
                  Score: <b>{question.score}</b>
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Panel for edit/delete */}
        <div className="flex gap-4 justify-end">
          <Button
            variant="outline"
            onClick={() => router.push(`/question/edit/${question.id}`)}
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
              Are you sure you want to delete this question? This action cannot
              be undone.
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
                  router.push("/question");
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
