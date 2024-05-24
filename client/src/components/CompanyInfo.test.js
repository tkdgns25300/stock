import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CompanyInfo from "../components/CompanyInfo";
import Title from "../components/Title";
import SubTitle from "../components/SubTitle";
import Description from "../components/Description";
import CompanyDetailTable from "../components/CompanyDetailTable";

jest.mock("../components/Title", () => () => <div>Title Component</div>);
jest.mock("../components/SubTitle", () => () => <div>SubTitle Component</div>);
jest.mock("../components/Description", () => () => <div>Description Component</div>);
jest.mock("../components/CompanyDetailTable", () => () => <div>CompanyDetailTable Component</div>);
