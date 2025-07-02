"use client";
import { useMemo, useState } from "react";
import QuizPanel from "./QuizPanel";
import QuizTable from "./QuizTable";

const QUIZ_DATA = [
  {
    id: "c8c51e50-982e-4e97-bf9f-26bd6f363a33",
    quizNumber: 1,
    name: "Quiz #1",
    startDateTime: "2025-06-09T04:00:45.433Z",
    endDateTime: "2025-06-09T04:03:15.433Z",
    room: "public",
    numQuestions: 10,
    animation: 3,
    duration: 150,
    winner: "e2150464-70e1-7041-fefb-5bd62c5259ff",
    numPlayers: 1,
    statistics:
      '{"189e1222-9d8b-4044-98da-9d358c1efa25":{"options":[{"count":1,"option":"Mexico"},{"count":0,"option":"Venezuela"},{"count":0,"option":"Colombia"},{"count":0,"option":"Brazil"},{"count":0,"option":"No Answer"}],"totalCount":1},"6d8dc01e-9645-4cfb-8667-2e677d8e9d90":{"options":[{"count":1,"option":"North Dakota"},{"count":0,"option":"Minnesota"},{"count":0,"option":"Wisconsin"},{"count":0,"option":"Iowa"},{"count":0,"option":"No Answer"}],"totalCount":1},"45d38669-4a56-43a0-a117-bc3703facf33":{"options":[{"count":1,"option":"Paris"},{"count":0,"option":"London"},{"count":0,"option":"Rome"},{"count":0,"option":"Berlin"},{"count":0,"option":"No Answer"}],"totalCount":1},"d0d3ebd8-5fc1-4823-8cca-6bccf1fdc122":{"options":[{"count":1,"option":"Eggplant"},{"count":0,"option":"Zucchini"},{"count":0,"option":"Cucumber"},{"count":0,"option":"Pumpkin"},{"count":0,"option":"No Answer"}],"totalCount":1},"e5ce69df-3295-4eb4-80b7-6e97bb894e2e":{"options":[{"count":1,"option":"London"},{"count":0,"option":"Singapore"},{"count":0,"option":"Stockholm"},{"count":0,"option":"Milan"},{"count":0,"option":"No Answer"}],"totalCount":1},"c7c4a89c-646d-44be-bfdb-3d07c12b53ac":{"options":[{"count":1,"option":"Transcendentalism"},{"count":0,"option":"Magical Realism"},{"count":0,"option":"Romanticism"},{"count":0,"option":"Naturalism"},{"count":0,"option":"No Answer"}],"totalCount":1},"3735f082-6857-42ac-9766-7680b71b80b0":{"options":[{"count":1,"option":"Jeans"},{"count":0,"option":"Shirts"},{"count":0,"option":"Dresses"},{"count":0,"option":"Socks"},{"count":0,"option":"No Answer"}],"totalCount":1},"21ba9e41-d297-4eef-9535-8d2bed8b45fb":{"options":[{"count":1,"option":"Buddha"},{"count":0,"option":"Laozi"},{"count":0,"option":"Krishna"},{"count":0,"option":"Confucius"},{"count":0,"option":"No Answer"}],"totalCount":1},"5cb1536d-f841-43e6-9e16-e7610329ea89":{"options":[{"count":1,"option":"Mongolian"},{"count":0,"option":"Old Church Slavonic"},{"count":0,"option":"Kyrgyz"},{"count":0,"option":"Russian"},{"count":0,"option":"No Answer"}],"totalCount":1},"be369d9c-7335-4c59-a033-4774b68c47d2":{"options":[{"count":1,"option":"Web development"},{"count":0,"option":"Embedded systems"},{"count":0,"option":"Game development"},{"count":0,"option":"Video editing"},{"count":0,"option":"No Answer"}],"totalCount":1}}',
    status: "DONE",
    createdAt: "2025-06-09T04:00:45.551Z",
    updatedAt: "2025-06-09T04:10:39.723Z",
    __typename: "Quiz",
  },
  {
    id: "4b8fb13a-6434-45f2-ac12-7f3ac79a82f7",
    quizNumber: 2,
    name: "Quiz #2",
    startDateTime: "2025-06-10T12:00:45.724Z",
    endDateTime: "2025-06-10T12:03:15.724Z",
    room: "public",
    numQuestions: 10,
    animation: 3,
    duration: 150,
    winner: "52f57484-c0d1-7025-45a3-7cd1296383ba",
    numPlayers: 2,
    statistics:
      '{"0dc485c8-09f7-422b-a504-563374a67437":{"options":[{"count":1,"option":"Toussaint Louverture"},{"count":1,"option":"François Duvalier"},{"count":0,"option":"Jean-Jacques Dessalines"},{"count":0,"option":"Henri Christophe"},{"count":0,"option":"No Answer"}],"totalCount":2},"6d8dc01e-9645-4cfb-8667-2e677d8e9d90":{"options":[{"count":1,"option":"North Dakota"},{"count":1,"option":"Wisconsin"},{"count":0,"option":"Minnesota"},{"count":0,"option":"Iowa"},{"count":0,"option":"No Answer"}],"totalCount":2},"c94cfc61-0bca-4c46-ba38-e03d56abe4a5":{"options":[{"count":1,"option":"None"},{"count":1,"option":"Burmese"},{"count":0,"option":"Tibetan"},{"count":0,"option":"Tibetan"},{"count":0,"option":"No Answer"}],"totalCount":2},"3b72ac59-6b8a-4d1b-a899-eff93a704663":{"options":[{"count":1,"option":"Japanese"},{"count":1,"option":"Chinese"},{"count":0,"option":"Korean"},{"count":0,"option":"Thai"},{"count":0,"option":"No Answer"}],"totalCount":2},"36562956-661b-4b4c-b28e-513f4a4fc3ba":{"options":[{"count":1,"option":"Tyrone Power"},{"count":1,"option":"Tyrone Biggums"},{"count":0,"option":"Tyrone Slothrop"},{"count":0,"option":"Tyrone Hayes"},{"count":0,"option":"No Answer"}],"totalCount":2},"daf178d4-d489-426a-8c50-5a11747775a8":{"options":[{"count":2,"option":"Helium"},{"count":0,"option":"Hydrogen"},{"count":0,"option":"Hafnium"},{"count":0,"option":"Holmium"},{"count":0,"option":"No Answer"}],"totalCount":2},"e5ce69df-3295-4eb4-80b7-6e97bb894e2e":{"options":[{"count":1,"option":"London"},{"count":1,"option":"No Answer"},{"count":0,"option":"Singapore"},{"count":0,"option":"Stockholm"},{"count":0,"option":"Milan"}],"totalCount":2},"52041859-c358-4386-bb93-8fab2a62a036":{"options":[{"count":1,"option":"Mount Olympus"},{"count":1,"option":"Elysium"},{"count":0,"option":"Underworld"},{"count":0,"option":"Asgard"},{"count":0,"option":"No Answer"}],"totalCount":2},"e16ef0c6-2966-461d-9375-0ac1e106aa6e":{"options":[{"count":1,"option":"Sailfish"},{"count":1,"option":"Swordfish"},{"count":0,"option":"Wahoo"},{"count":0,"option":"Bluefin tuna"},{"count":0,"option":"No Answer"}],"totalCount":2},"e54aae15-12a4-4b19-87b0-83d8c7f4c8b2":{"options":[{"count":1,"option":"Tiger Woods"},{"count":1,"option":"No Answer"},{"count":0,"option":"Jack Nicklaus"},{"count":0,"option":"Phil Mickelson"},{"count":0,"option":"Arnold Palmer"}],"totalCount":2}}',
    status: "DONE",
    createdAt: "2025-06-10T12:00:45.902Z",
    updatedAt: "2025-06-10T12:10:39.107Z",
    __typename: "Quiz",
  },
  {
    id: "3d9f7465-1fd7-4219-8434-26ab2371c76f",
    quizNumber: 3,
    name: "Quiz #3",
    startDateTime: "2025-06-13T20:00:45.367Z",
    endDateTime: "2025-06-13T20:03:15.367Z",
    room: "public",
    numQuestions: 10,
    animation: 3,
    duration: 150,
    winner: "b2756404-5071-70ad-bca7-d032f80d19da",
    numPlayers: 1,
    statistics:
      '{"3afb02da-2dca-4aff-87f8-66a0abdb0c11":{"options":[{"count":1,"option":"Byte"},{"count":0,"option":"Qubit"},{"count":0,"option":"Bit"},{"count":0,"option":"Octet"},{"count":0,"option":"No Answer"}],"totalCount":1},"e15f42c0-976b-429b-8915-d2910811ff08":{"options":[{"count":1,"option":"Shoes"},{"count":0,"option":"Gloves"},{"count":0,"option":"Hats"},{"count":0,"option":"Belts"},{"count":0,"option":"No Answer"}],"totalCount":1},"2f163a38-77f1-40dd-88c7-b1409cfcf831":{"options":[{"count":1,"option":"No Answer"},{"count":0,"option":"Totonac"},{"count":0,"option":"Aztec"},{"count":0,"option":"Mayan"},{"count":0,"option":"Inca"}],"totalCount":1},"0dc485c8-09f7-422b-a504-563374a67437":{"options":[{"count":1,"option":"Henri Christophe"},{"count":0,"option":"Toussaint Louverture"},{"count":0,"option":"Jean-Jacques Dessalines"},{"count":0,"option":"François Duvalier"},{"count":0,"option":"No Answer"}],"totalCount":1},"c94cfc61-0bca-4c46-ba38-e03d56abe4a5":{"options":[{"count":1,"option":"Burmese"},{"count":0,"option":"None"},{"count":0,"option":"Tibetan"},{"count":0,"option":"Tibetan"},{"count":0,"option":"No Answer"}],"totalCount":1},"0c3e89b5-4ab7-45c6-90ee-5247110ee692":{"options":[{"count":1,"option":"Refraction"},{"count":0,"option":"Diffraction"},{"count":0,"option":"Reflection"},{"count":0,"option":"Interference"},{"count":0,"option":"No Answer"}],"totalCount":1},"628f6370-3897-4b51-9695-1bebf1833024":{"options":[{"count":1,"option":"Kelly Clarkson"},{"count":0,"option":"Carrie Underwood"},{"count":0,"option":"Fantasia Barrino"},{"count":0,"option":"Ruben Studdard"},{"count":0,"option":"No Answer"}],"totalCount":1},"b585eaa2-1f6e-4534-a0bb-8e67d01cdfcf":{"options":[{"count":1,"option":"No Answer"},{"count":0,"option":"Kansas"},{"count":0,"option":"Nebraska"},{"count":0,"option":"Iowa"},{"count":0,"option":"Missouri"}],"totalCount":1},"01ff4b14-6718-4dcd-8ef4-7d0c5a7451b3":{"options":[{"count":1,"option":"Andromeda Galaxy"},{"count":0,"option":"Triangulum Galaxy"},{"count":0,"option":"Whirlpool Galaxy"},{"count":0,"option":"Sombrero Galaxy"},{"count":0,"option":"No Answer"}],"totalCount":1},"f4849448-0e10-4844-a646-479c1293a956":{"options":[{"count":1,"option":"No Answer"},{"count":0,"option":"Vietnam War"},{"count":0,"option":"World War II"},{"count":0,"option":"Korean War"},{"count":0,"option":"Gulf War"}],"totalCount":1}}',
    status: "DONE",
    createdAt: "2025-06-13T20:00:45.557Z",
    updatedAt: "2025-06-13T20:10:39.359Z",
    __typename: "Quiz",
  },
  {
    id: "adeea285-0140-4cdf-8722-f164258373d1",
    quizNumber: 4,
    name: "Quiz #4",
    startDateTime: "2025-06-21T20:00:46.304Z",
    endDateTime: "2025-06-21T20:03:16.304Z",
    room: "public",
    numQuestions: 10,
    animation: 3,
    duration: 150,
    winner: "3255a4f4-0001-709f-138c-2b1952e3e140",
    numPlayers: 1,
    statistics:
      '{"3afb02da-2dca-4aff-87f8-66a0abdb0c11":{"options":[{"count":1,"option":"Octet"},{"count":0,"option":"Qubit"},{"count":0,"option":"Byte"},{"count":0,"option":"Bit"},{"count":0,"option":"No Answer"}],"totalCount":1},"e15f42c0-976b-429b-8915-d2910811ff08":{"options":[{"count":1,"option":"No Answer"},{"count":0,"option":"Shoes"},{"count":0,"option":"Gloves"},{"count":0,"option":"Hats"},{"count":0,"option":"Belts"}],"totalCount":1},"2f163a38-77f1-40dd-88c7-b1409cfcf831":{"options":[{"count":1,"option":"Mayan"},{"count":0,"option":"Totonac"},{"count":0,"option":"Aztec"},{"count":0,"option":"Inca"},{"count":0,"option":"No Answer"}],"totalCount":1},"0dc485c8-09f7-422b-a504-563374a67437":{"options":[{"count":1,"option":"Jean-Jacques Dessalines"},{"count":0,"option":"Toussaint Louverture"},{"count":0,"option":"Henri Christophe"},{"count":0,"option":"François Duvalier"},{"count":0,"option":"No Answer"}],"totalCount":1},"c94cfc61-0bca-4c46-ba38-e03d56abe4a5":{"options":[{"count":1,"option":"South"},{"count":0,"option":"Hello"},{"count":0,"option":"Peace"},{"count":0,"option":"Friend"},{"count":0,"option":"No Answer"}],"totalCount":1},"45d38669-4a56-43a0-a117-bc3703facf33":{"options":[{"count":1,"option":"No Answer"},{"count":0,"option":"Paris"},{"count":0,"option":"London"},{"count":0,"option":"Rome"},{"count":0,"option":"Berlin"}],"totalCount":1},"d0d3ebd8-5fc1-4823-8cca-6bccf1fdc122":{"options":[{"count":1,"option":"Pumpkin"},{"count":0,"option":"Eggplant"},{"count":0,"option":"Zucchini"},{"count":0,"option":"Cucumber"},{"count":0,"option":"No Answer"}],"totalCount":1},"c63a34c5-3712-468e-88b5-282f990f4d8a":{"options":[{"count":1,"option":"George Handel"},{"count":0,"option":"Antonio Vivaldi"},{"count":0,"option":"Johann Pachelbel"},{"count":0,"option":"Arcangelo Corelli"},{"count":0,"option":"No Answer"}],"totalCount":1},"21ba9e41-d297-4eef-9535-8d2bed8b45fb":{"options":[{"count":1,"option":"Krishna"},{"count":0,"option":"Buddha"},{"count":0,"option":"Laozi"},{"count":0,"option":"Confucius"},{"count":0,"option":"No Answer"}],"totalCount":1},"8fd6e986-d054-4ccb-be31-b9fd3ee72062":{"options":[{"count":1,"option":"Asteroid"},{"count":0,"option":"Star"},{"count":0,"option":"Planet"},{"count":0,"option":"Comet"},{"count":0,"option":"No Answer"}],"totalCount":1}}',
    status: "DONE",
    createdAt: "2025-06-21T20:00:46.572Z",
    updatedAt: "2025-06-21T20:10:38.802Z",
    __typename: "Quiz",
  },
  {
    id: "78e5ed57-bdd7-4de0-9b19-32e572014f7b",
    quizNumber: 5,
    name: "Quiz #5",
    startDateTime: "2025-06-23T21:00:51.213Z",
    endDateTime: "2025-06-23T21:03:21.213Z",
    room: "public",
    numQuestions: 10,
    animation: 3,
    duration: 150,
    winner: null,
    numPlayers: null,
    statistics: null,
    status: "DONE",
    createdAt: "2025-06-23T21:00:51.467Z",
    updatedAt: "2025-06-23T21:00:51.467Z",
    __typename: "Quiz",
  },
  {
    id: "500d8e96-050c-41e4-9661-ca17e339cee7",
    quizNumber: 6,
    name: "Quiz #6",
    startDateTime: "2025-06-25T12:00:27.864Z",
    endDateTime: "2025-06-25T12:02:57.864Z",
    room: "public",
    numQuestions: 10,
    animation: 3,
    duration: 150,
    winner: "52f57484-c0d1-7025-45a3-7cd1296383ba",
    numPlayers: 1,
    statistics:
      '{"2917422c-cb69-4115-9979-f5a99e808b37":{"options":[{"count":1,"option":"Subway"},{"count":0,"option":"Tram"},{"count":0,"option":"Bus"},{"count":0,"option":"Taxi"},{"count":0,"option":"No Answer"}],"totalCount":1},"189e1222-9d8b-4044-98da-9d358c1efa25":{"options":[{"count":1,"option":"Mexico"},{"count":0,"option":"Venezuela"},{"count":0,"option":"Colombia"},{"count":0,"option":"Brazil"},{"count":0,"option":"No Answer"}],"totalCount":1},"36562956-661b-4b4c-b28e-513f4a4fc3ba":{"options":[{"count":1,"option":"Tyrone Biggums"},{"count":0,"option":"Tyrone Slothrop"},{"count":0,"option":"Tyrone Power"},{"count":0,"option":"Tyrone Hayes"},{"count":0,"option":"No Answer"}],"totalCount":1},"d0d3ebd8-5fc1-4823-8cca-6bccf1fdc122":{"options":[{"count":1,"option":"Cucumber"},{"count":0,"option":"Eggplant"},{"count":0,"option":"Zucchini"},{"count":0,"option":"Pumpkin"},{"count":0,"option":"No Answer"}],"totalCount":1},"c63a34c5-3712-468e-88b5-282f990f4d8a":{"options":[{"count":1,"option":"George Handel"},{"count":0,"option":"Antonio Vivaldi"},{"count":0,"option":"Johann Pachelbel"},{"count":0,"option":"Arcangelo Corelli"},{"count":0,"option":"No Answer"}],"totalCount":1},"01ff4b14-6718-4dcd-8ef4-7d0c5a7451b3":{"options":[{"count":1,"option":"Andromeda Galaxy"},{"count":0,"option":"Triangulum Galaxy"},{"count":0,"option":"Whirlpool Galaxy"},{"count":0,"option":"Sombrero Galaxy"},{"count":0,"option":"No Answer"}],"totalCount":1},"52041859-c358-4386-bb93-8fab2a62a036":{"options":[{"count":1,"option":"Asgard"},{"count":0,"option":"Underworld"},{"count":0,"option":"Mount Olympus"},{"count":0,"option":"Elysium"},{"count":0,"option":"No Answer"}],"totalCount":1},"cafa2e22-b6fb-4cab-be03-dc9a7f629b2a":{"options":[{"count":1,"option":"Zambezi River"},{"count":0,"option":"Niger River"},{"count":0,"option":"Congo River"},{"count":0,"option":"Limpopo River"},{"count":0,"option":"No Answer"}],"totalCount":1},"5ed88b0d-b8a0-45d2-8b6b-b6dcd1ac19da":{"options":[{"count":1,"option":"Ruby"},{"count":0,"option":"Java"},{"count":0,"option":"Python"},{"count":0,"option":"C#"},{"count":0,"option":"No Answer"}],"totalCount":1},"f4849448-0e10-4844-a646-479c1293a956":{"options":[{"count":1,"option":"World War II"},{"count":0,"option":"Vietnam War"},{"count":0,"option":"Korean War"},{"count":0,"option":"Gulf War"},{"count":0,"option":"No Answer"}],"totalCount":1}}',
    status: "DONE",
    createdAt: "2025-06-25T12:00:28.049Z",
    updatedAt: "2025-06-25T12:10:56.084Z",
    __typename: "Quiz",
  },
  {
    id: "96fc03b8-63f0-4f23-81ff-725a91ffca5e",
    quizNumber: 7,
    name: "Quiz #7",
    startDateTime: "2025-06-25T20:00:27.458Z",
    endDateTime: "2025-06-25T20:02:57.458Z",
    room: "public",
    numQuestions: 10,
    animation: 3,
    duration: 150,
    winner: "3255a4f4-0001-709f-138c-2b1952e3e140",
    numPlayers: 2,
    statistics:
      '{"2f163a38-77f1-40dd-88c7-b1409cfcf831":{"options":[{"count":1,"option":"Totonac"},{"count":1,"option":"Aztec"},{"count":0,"option":"Mayan"},{"count":0,"option":"Inca"},{"count":0,"option":"No Answer"}],"totalCount":2},"c94cfc61-0bca-4c46-ba38-e03d56abe4a5":{"options":[{"count":2,"option":"South"},{"count":0,"option":"Hello"},{"count":0,"option":"Peace"},{"count":0,"option":"Friend"},{"count":0,"option":"No Answer"}],"totalCount":2},"70da0cc8-81ad-4801-938d-0aa9adf7aef4":{"options":[{"count":1,"option":"German Revolution"},{"count":1,"option":"War of the Roses"},{"count":0,"option":"Peasants\' War"},{"count":0,"option":"Thirty Years\' War"},{"count":0,"option":"No Answer"}],"totalCount":2},"36562956-661b-4b4c-b28e-513f4a4fc3ba":{"options":[{"count":2,"option":"Tyrone Slothrop"},{"count":0,"option":"Tyrone Power"},{"count":0,"option":"Tyrone Biggums"},{"count":0,"option":"Tyrone Hayes"},{"count":0,"option":"No Answer"}],"totalCount":2},"daf178d4-d489-426a-8c50-5a11747775a8":{"options":[{"count":2,"option":"Helium"},{"count":0,"option":"Hydrogen"},{"count":0,"option":"Hafnium"},{"count":0,"option":"Holmium"},{"count":0,"option":"No Answer"}],"totalCount":2},"e5ce69df-3295-4eb4-80b7-6e97bb894e2e":{"options":[{"count":1,"option":"Singapore"},{"count":1,"option":"No Answer"},{"count":0,"option":"London"},{"count":0,"option":"Stockholm"},{"count":0,"option":"Milan"}],"totalCount":2},"c793f156-659c-4ed1-bb2e-e25071e6b2ff":{"options":[{"count":2,"option":"Birkin"},{"count":0,"option":"Sofia"},{"count":0,"option":"Alexa"},{"count":0,"option":"Lana"},{"count":0,"option":"No Answer"}],"totalCount":2},"a1d238c3-2c78-4fdc-b614-5ed92eb79e8e":{"options":[{"count":2,"option":"No Answer"},{"count":0,"option":"Unilever"},{"count":0,"option":"Nestlé"},{"count":0,"option":"PepsiCo"},{"count":0,"option":"Kraft Heinz"}],"totalCount":2},"0b64f122-8a33-4e91-91d5-09d91ac79e6e":{"options":[{"count":1,"option":"Turmeric"},{"count":1,"option":"No Answer"},{"count":0,"option":"Paprika"},{"count":0,"option":"Cumin"},{"count":0,"option":"Saffron"}],"totalCount":2},"62aab2d5-e3d4-4023-bdd2-7502031ad393":{"options":[{"count":1,"option":"Expressionism"},{"count":1,"option":"Neorealism"},{"count":0,"option":"Surrealism"},{"count":0,"option":"Avant-garde"},{"count":0,"option":"No Answer"}],"totalCount":2}}',
    status: "DONE",
    createdAt: "2025-06-25T20:00:27.616Z",
    updatedAt: "2025-06-25T20:10:56.137Z",
    __typename: "Quiz",
  },
  {
    id: "c03d3774-01cf-490e-b806-dea0c8df079f",
    quizNumber: 8,
    name: "Quiz #8",
    startDateTime: "2025-06-26T12:00:28.033Z",
    endDateTime: "2025-06-26T12:02:58.033Z",
    room: "public",
    numQuestions: 10,
    animation: 3,
    duration: 150,
    winner: "52f57484-c0d1-7025-45a3-7cd1296383ba",
    numPlayers: 2,
    statistics:
      '{"3afb02da-2dca-4aff-87f8-66a0abdb0c11":{"options":[{"count":2,"option":"Qubit"},{"count":0,"option":"Byte"},{"count":0,"option":"Bit"},{"count":0,"option":"Octet"},{"count":0,"option":"No Answer"}],"totalCount":2},"628f6370-3897-4b51-9695-1bebf1833024":{"options":[{"count":1,"option":"Kelly Clarkson"},{"count":1,"option":"Carrie Underwood"},{"count":0,"option":"Fantasia Barrino"},{"count":0,"option":"Ruben Studdard"},{"count":0,"option":"No Answer"}],"totalCount":2},"1c18ce7a-4e59-44e2-b9a7-560e42dcc599":{"options":[{"count":1,"option":"Andriy Shevchenko"},{"count":1,"option":"Ronaldinho"},{"count":0,"option":"Zinedine Zidane"},{"count":0,"option":"Pavel Nedved"},{"count":0,"option":"No Answer"}],"totalCount":2},"c63a34c5-3712-468e-88b5-282f990f4d8a":{"options":[{"count":2,"option":"No Answer"},{"count":0,"option":"Antonio Vivaldi"},{"count":0,"option":"Johann Pachelbel"},{"count":0,"option":"George Handel"},{"count":0,"option":"Arcangelo Corelli"}],"totalCount":2},"52041859-c358-4386-bb93-8fab2a62a036":{"options":[{"count":1,"option":"Underworld"},{"count":1,"option":"Mount Olympus"},{"count":0,"option":"Elysium"},{"count":0,"option":"Asgard"},{"count":0,"option":"No Answer"}],"totalCount":2},"e16ef0c6-2966-461d-9375-0ac1e106aa6e":{"options":[{"count":2,"option":"Sailfish"},{"count":0,"option":"Wahoo"},{"count":0,"option":"Swordfish"},{"count":0,"option":"Bluefin tuna"},{"count":0,"option":"No Answer"}],"totalCount":2},"62aab2d5-e3d4-4023-bdd2-7502031ad393":{"options":[{"count":1,"option":"Surrealism"},{"count":1,"option":"Neorealism"},{"count":0,"option":"Expressionism"},{"count":0,"option":"Avant-garde"},{"count":0,"option":"No Answer"}],"totalCount":2},"3a2f64ee-d74a-4c30-a32c-a910fc698cbc":{"options":[{"count":1,"option":"Treaty of Paris"},{"count":1,"option":"Treaty of Tordesillas"},{"count":0,"option":"Peace of Westphalia"},{"count":0,"option":"Treaty of Utrecht"},{"count":0,"option":"No Answer"}],"totalCount":2},"64ab88d0-051e-46f7-924b-aa39e45577a6":{"options":[{"count":1,"option":"Spain"},{"count":1,"option":"Greece"},{"count":0,"option":"Cuba"},{"count":0,"option":"Mexico"},{"count":0,"option":"No Answer"}],"totalCount":2},"0f71aa11-b04d-434e-b37f-20ec50344959":{"options":[{"count":1,"option":"La Paz"},{"count":1,"option":"Kathmandu"},{"count":0,"option":"Quito"},{"count":0,"option":"Thimphu"},{"count":0,"option":"No Answer"}],"totalCount":2}}',
    status: "DONE",
    createdAt: "2025-06-26T12:00:28.175Z",
    updatedAt: "2025-06-26T12:10:56.704Z",
    __typename: "Quiz",
  },
  {
    id: "38d4ba10-7b90-4a3b-95ef-54c1ea60227a",
    quizNumber: 9,
    name: "Quiz #9",
    startDateTime: "2025-06-26T20:00:28.076Z",
    endDateTime: "2025-06-26T20:02:58.076Z",
    room: "public",
    numQuestions: 10,
    animation: 3,
    duration: 150,
    winner: "e22514c4-7061-7003-de6f-38feccb41f8c",
    numPlayers: 3,
    statistics:
      '{"e15f42c0-976b-429b-8915-d2910811ff08":{"options":[{"count":2,"option":"Hats"},{"count":1,"option":"No Answer"},{"count":0,"option":"Shoes"},{"count":0,"option":"Gloves"},{"count":0,"option":"Belts"}],"totalCount":3},"daebf054-d68e-4d18-8d1c-350f790d58f6":{"options":[{"count":2,"option":"Tractor"},{"count":1,"option":"No Answer"},{"count":0,"option":"Sedan"},{"count":0,"option":"Helicopter"},{"count":0,"option":"Motorcycle"}],"totalCount":3},"c94cfc61-0bca-4c46-ba38-e03d56abe4a5":{"options":[{"count":1,"option":"Peace"},{"count":1,"option":"Friend"},{"count":1,"option":"No Answer"},{"count":0,"option":"South"},{"count":0,"option":"Hello"}],"totalCount":3},"36562956-661b-4b4c-b28e-513f4a4fc3ba":{"options":[{"count":1,"option":"Tyrone Biggums"},{"count":1,"option":"Tyrone Hayes"},{"count":1,"option":"No Answer"},{"count":0,"option":"Tyrone Slothrop"},{"count":0,"option":"Tyrone Power"}],"totalCount":3},"6c774ec4-216b-4295-b7bd-f524ea4a6abb":{"options":[{"count":2,"option":"Kiwi"},{"count":1,"option":"No Answer"},{"count":0,"option":"Penguin"},{"count":0,"option":"Ostrich"},{"count":0,"option":"Emu"}],"totalCount":3},"3273c12f-4519-4fe0-9208-38d819b94835":{"options":[{"count":2,"option":"MIPS Technologies"},{"count":1,"option":"No Answer"},{"count":0,"option":"Intel"},{"count":0,"option":"AMD"},{"count":0,"option":"ARM Holdings"}],"totalCount":3},"cafa2e22-b6fb-4cab-be03-dc9a7f629b2a":{"options":[{"count":1,"option":"Zambezi River"},{"count":1,"option":"Limpopo River"},{"count":1,"option":"No Answer"},{"count":0,"option":"Niger River"},{"count":0,"option":"Congo River"}],"totalCount":3},"158a7505-92ba-4e90-bb9d-dacb3ef37d0a":{"options":[{"count":1,"option":"Frank Underwood"},{"count":1,"option":"Fitz Grant"},{"count":1,"option":"No Answer"},{"count":0,"option":"Josiah Bartlet"},{"count":0,"option":"David Palmer"}],"totalCount":3},"086a6610-f238-45e8-893e-75bbcaeb3ca1":{"options":[{"count":1,"option":"Piet Mondrian"},{"count":1,"option":"Giorgio de Chirico"},{"count":1,"option":"No Answer"},{"count":0,"option":"Kazimir Malevich"},{"count":0,"option":"Wassily Kandinsky"}],"totalCount":3},"a1d238c3-2c78-4fdc-b614-5ed92eb79e8e":{"options":[{"count":2,"option":"Unilever"},{"count":1,"option":"Nestlé"},{"count":0,"option":"PepsiCo"},{"count":0,"option":"Kraft Heinz"},{"count":0,"option":"No Answer"}],"totalCount":3}}',
    status: "DONE",
    createdAt: "2025-06-26T20:00:28.253Z",
    updatedAt: "2025-06-26T20:10:56.732Z",
    __typename: "Quiz",
  },
  {
    id: "6b5399df-7d5f-46d3-afa7-02cfc315f639",
    quizNumber: 10,
    name: "Quiz #10",
    startDateTime: "2025-06-27T12:00:27.680Z",
    endDateTime: "2025-06-27T12:02:57.680Z",
    room: "public",
    numQuestions: 10,
    animation: 3,
    duration: 150,
    winner: "e22514c4-7061-7003-de6f-38feccb41f8c",
    numPlayers: 2,
    statistics:
      '{"bd90fab2-c8d8-4b60-a527-e2437f9511f6":{"options":[{"count":1,"option":"Resilience"},{"count":1,"option":"Redundancy"},{"count":0,"option":"Latency"},{"count":0,"option":"Throughput"},{"count":0,"option":"No Answer"}],"totalCount":2},"bd286a55-b62b-4960-9d1b-18a5b800e8a7":{"options":[{"count":2,"option":"Dead Sea"},{"count":0,"option":"Sargasso Sea"},{"count":0,"option":"Red Sea"},{"count":0,"option":"Black Sea"},{"count":0,"option":"No Answer"}],"totalCount":2},"a2d2d341-b878-442c-928c-4056fad95af6":{"options":[{"count":1,"option":"~150 tons"},{"count":1,"option":"~300 tons"},{"count":0,"option":"~250 tons"},{"count":0,"option":"~100 tons"},{"count":0,"option":"No Answer"}],"totalCount":2},"0ad88284-d4ac-4dc1-9acc-c1d9a5a10974":{"options":[{"count":1,"option":"Brandon Wright"},{"count":1,"option":"D\'Angelo Barksdale"},{"count":0,"option":"Wallace"},{"count":0,"option":"Stringer Bell"},{"count":0,"option":"No Answer"}],"totalCount":2},"76373dd1-1c61-4a95-ae12-d57e21813389":{"options":[{"count":2,"option":"Land of giants"},{"count":0,"option":"Primordial void"},{"count":0,"option":"World tree"},{"count":0,"option":"Underworld realm"},{"count":0,"option":"No Answer"}],"totalCount":2},"0c3e89b5-4ab7-45c6-90ee-5247110ee692":{"options":[{"count":2,"option":"Refraction"},{"count":0,"option":"Diffraction"},{"count":0,"option":"Reflection"},{"count":0,"option":"Interference"},{"count":0,"option":"No Answer"}],"totalCount":2},"45d38669-4a56-43a0-a117-bc3703facf33":{"options":[{"count":2,"option":"Paris"},{"count":0,"option":"London"},{"count":0,"option":"Rome"},{"count":0,"option":"Berlin"},{"count":0,"option":"No Answer"}],"totalCount":2},"b51eabe3-4ff0-4a8d-b098-d6dd3a23354f":{"options":[{"count":2,"option":"Sneakers"},{"count":0,"option":"Sandals"},{"count":0,"option":"Boots"},{"count":0,"option":"Loafers"},{"count":0,"option":"No Answer"}],"totalCount":2},"e54aae15-12a4-4b19-87b0-83d8c7f4c8b2":{"options":[{"count":1,"option":"Jack Nicklaus"},{"count":1,"option":"Arnold Palmer"},{"count":0,"option":"Tiger Woods"},{"count":0,"option":"Phil Mickelson"},{"count":0,"option":"No Answer"}],"totalCount":2},"33e980f3-d5a3-41fa-8f9c-5a8bb9b2f13e":{"options":[{"count":1,"option":"Gustav Mahler"},{"count":1,"option":"No Answer"},{"count":0,"option":"Richard Strauss"},{"count":0,"option":"Franz Liszt"},{"count":0,"option":"Johannes Brahms"}],"totalCount":2}}',
    status: "DONE",
    createdAt: "2025-06-27T12:00:27.859Z",
    updatedAt: "2025-06-27T12:10:55.857Z",
    __typename: "Quiz",
  },
];

const StatusEnum = ["NEW", "NEXT", "HOLD", "DONE"];

const QuizTableWithFilters = () => {
  const [roomSearch, setRoomSearch] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);

  const filteredData = useMemo(() => {
    return QUIZ_DATA.filter(
      (q) =>
        (!roomSearch ||
          q.room.toLowerCase().includes(roomSearch.toLowerCase())) &&
        (!status || q.status === status) &&
        (!date || q.quizDate === date)
    );
  }, [roomSearch, status, date]);

  return (
    <div className="p-6">
      <QuizPanel
        roomSearch={roomSearch}
        setRoomSearch={setRoomSearch}
        date={date || ""}
        setDate={setDate}
        status={status || ""}
        setStatus={setStatus}
        StatusEnum={StatusEnum}
      />

      <QuizTable data={filteredData} />
    </div>
  );
};

export default QuizTableWithFilters;
