"use client";
import { DataTable } from "@/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Filter, Plus } from "lucide-react";
import {
  DataTableContainer,
  DataTableContent,
  DataTablePagination,
} from "../DataTable";

type Question = {
  id: string;
  position: number;
  question: string;
  picture: string | null;
  options: string[];
  answer: string;
  timer: number;
  score: number;
  coins: number;
  type: string;
  category: string;
  difficulty: string;
  lastUsed: string;
  modePosition: string;
  modeLastUsed: string;
  createdAt: string;
  updatedAt: string;
  __typename: string;
};

// Custom Header Component
function QuestionTableHeader() {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-foreground">Questions</h3>
        <p className="text-sm text-muted-foreground">
          Manage and view all quiz questions in your database
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
        <Button size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Question
        </Button>
      </div>
    </div>
  );
}

// Custom Empty State
function QuestionEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-12">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
        <svg
          className="w-8 h-8 text-muted-foreground"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <div className="text-center space-y-2">
        <h4 className="text-lg font-medium text-foreground">
          No questions found
        </h4>
        <p className="text-sm text-muted-foreground max-w-sm">
          Get started by creating your first question. You can add multiple
          choice, true/false, or custom question types.
        </p>
      </div>
      <Button>
        <Plus className="w-4 h-4 mr-2" />
        Create First Question
      </Button>
    </div>
  );
}

const columns = [
  {
    label: "Question",
    accessor: "question",
    render: (row: Question) => (
      <div className="max-w-xs truncate" title={row.question}>
        {row.question}
      </div>
    ),
  },
  {
    label: "Options",
    accessor: "options",
    render: (row: Question) => (
      <div
        className="max-w-xs truncate text-muted-foreground"
        title={row.options.join(", ")}
      >
        {row.options.join(", ")}
      </div>
    ),
  },
  {
    label: "Answer",
    accessor: "answer",
    render: (row: Question) => (
      <Badge
        variant="secondary"
        className="bg-primary/10 text-primary border-primary/20"
      >
        {row.answer}
      </Badge>
    ),
  },
  {
    label: "Timer",
    accessor: "timer",
    render: (row: Question) => (
      <span className="text-sm text-muted-foreground">{row.timer}s</span>
    ),
  },
  {
    label: "Score",
    accessor: "score",
    render: (row: Question) => (
      <span className="font-medium text-foreground">{row.score}</span>
    ),
  },
  {
    label: "Type",
    accessor: "type",
    render: (row: Question) => (
      <Badge
        variant="outline"
        className="bg-secondary/10 text-secondary-foreground border-secondary/20"
      >
        {row.type}
      </Badge>
    ),
  },
  {
    label: "Category",
    accessor: "category",
    render: (row: Question) => (
      <span className="text-sm text-muted-foreground">{row.category}</span>
    ),
  },
  {
    label: "Difficulty",
    accessor: "difficulty",
    render: (row: Question) => {
      const difficultyColors = {
        easy: "bg-green-100 text-green-800 border-green-200",
        medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
        hard: "bg-red-100 text-red-800 border-red-200",
      };
      const colorClass =
        difficultyColors[
          row.difficulty.toLowerCase() as keyof typeof difficultyColors
        ] || "bg-gray-100 text-gray-800 border-gray-200";

      return <Badge className={`border ${colorClass}`}>{row.difficulty}</Badge>;
    },
  },
];

type Props = {
  data: Question[];
};

// Method 1: Using the main DataTable component with custom props
export function SimpleQuestionTable({ data }: Props) {
  return (
    <DataTable
      columns={columns}
      data={data}
      pageSize={10}
      total={data.length}
      getRowId={(row: Question) => row.id}
      title="Questions"
      description="Manage and view all quiz questions in your database"
    />
  );
}

// Method 2: Using composition pattern for maximum customization
export function CustomQuestionTable({ data }: Props) {
  return (
    <div className="space-y-4">
      <QuestionTableHeader />

      <DataTableContainer>
        <DataTableContent
          columns={columns}
          data={data}
          getRowId={(row: Question) => row.id}
          emptyState={<QuestionEmptyState />}
        />
      </DataTableContainer>

      {data.length > 10 && (
        <DataTablePagination
          page={1}
          totalPages={Math.ceil(data.length / 10)}
          total={data.length}
          pageSize={10}
          onPageChange={() => {}}
        />
      )}
    </div>
  );
}

// Method 3: Using the main component but overriding specific parts
export function HybridQuestionTable({ data }: Props) {
  return (
    <DataTable
      columns={columns}
      data={data}
      pageSize={10}
      total={data.length}
      getRowId={(row: Question) => row.id}
      header={<QuestionTableHeader />}
      emptyState={<QuestionEmptyState />}
    />
  );
}
