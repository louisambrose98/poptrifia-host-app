import { Badge } from "@/components/ui/badge";
import React from "react";

interface ItemBadgeProps {
  type: "type" | "category" | "difficulty" | "status" | "room" | "winner";
  value: string | number;
}

const typeStyles: Record<string, string> = {
  type: "bg-secondary/10 text-secondary-foreground border-secondary/20 rounded-md",
  // Category styles
  category_animals:
    "bg-orange-100 text-orange-800 border-orange-200 rounded-md",
  category_art: "bg-pink-100 text-pink-800 border-pink-200 rounded-md",
  category_business: "bg-blue-100 text-blue-800 border-blue-200 rounded-md",
  category_celebrities:
    "bg-yellow-100 text-yellow-800 border-yellow-200 rounded-md",
  category_country: "bg-green-100 text-green-800 border-green-200 rounded-md",
  category_cultures:
    "bg-purple-100 text-purple-800 border-purple-200 rounded-md",
  category_food_and_drinks: "bg-red-100 text-red-800 border-red-200 rounded-md",
  category_fashion: "bg-pink-200 text-pink-900 border-pink-300 rounded-md",
  category_general_knowledge:
    "bg-gray-100 text-gray-800 border-gray-200 rounded-md",
  category_geography: "bg-blue-200 text-blue-900 border-blue-300 rounded-md",
  category_history:
    "bg-yellow-200 text-yellow-900 border-yellow-300 rounded-md",
  category_hobbies: "bg-green-200 text-green-900 border-green-300 rounded-md",
  category_language:
    "bg-indigo-100 text-indigo-800 border-indigo-200 rounded-md",
  category_law_and_crimes: "bg-red-200 text-red-900 border-red-300 rounded-md",
  category_literature:
    "bg-purple-200 text-purple-900 border-purple-300 rounded-md",
  category_mathematics: "bg-cyan-100 text-cyan-800 border-cyan-200 rounded-md",
  category_movies: "bg-yellow-300 text-yellow-900 border-yellow-400 rounded-md",
  category_music: "bg-green-300 text-green-900 border-green-400 rounded-md",
  category_mythology_religion:
    "bg-indigo-200 text-indigo-900 border-indigo-300 rounded-md",
  category_politics: "bg-red-300 text-red-900 border-red-400 rounded-md",
  category_poptrifia: "bg-blue-300 text-blue-900 border-blue-400 rounded-md",
  category_science: "bg-green-400 text-green-900 border-green-500 rounded-md",
  category_space_and_astronomy:
    "bg-indigo-300 text-indigo-900 border-indigo-400 rounded-md",
  category_sports: "bg-orange-200 text-orange-900 border-orange-300 rounded-md",
  category_technology: "bg-gray-200 text-gray-900 border-gray-300 rounded-md",
  category_television:
    "bg-purple-300 text-purple-900 border-purple-400 rounded-md",
  category_toys_and_games:
    "bg-pink-300 text-pink-900 border-pink-400 rounded-md",
  category_transportation:
    "bg-cyan-200 text-cyan-900 border-cyan-300 rounded-md",
  category_default: "bg-gray-100 text-gray-800 border-gray-200 rounded-md",
  // Difficulty styles
  difficulty_easy: "bg-green-100 text-green-800 border-green-200 rounded-full",
  difficulty_medium:
    "bg-yellow-100 text-yellow-800 border-yellow-200 rounded-full",
  difficulty_hard: "bg-red-100 text-red-800 border-red-200 rounded-full",
  difficulty_default: "bg-gray-100 text-gray-800 border-gray-200 rounded-full",
  // Status styles
  status_new: "bg-green-100 text-green-800 border-green-200 rounded-full",
  status_next: "bg-yellow-100 text-yellow-800 border-yellow-200 rounded-full",
  status_hold: "bg-red-100 text-red-800 border-red-200 rounded-full",
  status_done: "bg-blue-100 text-blue-800 border-blue-200 rounded-full",
  status_default: "bg-gray-100 text-gray-800 border-gray-200 rounded-full",
  // Room styles
  room_public: "bg-green-100 text-green-800 border-green-200 rounded-full",
  room_default: "bg-gray-100 text-gray-800 border-gray-200 rounded-full",
  // Winner styles
  winner_won: "bg-green-100 text-green-800 border-green-200 rounded-full",
  winner_lost: "bg-red-100 text-red-800 border-red-200 rounded-full",
  winner_default: "bg-gray-100 text-gray-800 border-gray-200 rounded-full",
};

export const ItemBadge: React.FC<ItemBadgeProps> = ({ type, value }) => {
  let className = "";
  if (type === "type") className = typeStyles.type;
  else if (type === "category") {
    const key = `category_${String(value)
      .toLowerCase()
      .replace(/\s|&|-/g, "_")}`;
    className = typeStyles[key] || typeStyles.category_default;
  } else if (type === "difficulty") {
    const diff = String(value).toLowerCase();
    className =
      typeStyles[`difficulty_${diff}`] || typeStyles.difficulty_default;
  } else if (type === "status") {
    const status = String(value).toLowerCase();
    className = typeStyles[`status_${status}`] || typeStyles.status_default;
  } else if (type === "room") {
    const room = String(value).toLowerCase();
    className = typeStyles[`room_${room}`] || typeStyles.room_default;
  } else if (type === "winner") {
    const winner = String(value).toLowerCase();
    className = typeStyles[`winner_${winner}`] || typeStyles.winner_default;
  }

  return <Badge className={className}>{value}</Badge>;
};

export default ItemBadge;
