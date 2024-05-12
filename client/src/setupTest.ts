import "@testing-library/jest-dom";

import "@testing-library/jest-dom";
import { server } from "./mocks/server";

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that are declared in a test.
afterEach(() => server.resetHandlers());

// Clean up after all tests are finished.
afterAll(() => server.close());
