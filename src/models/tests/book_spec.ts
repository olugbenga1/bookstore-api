import { Book, BookStore } from "../book";

const store = new BookStore();

describe("Integation test for the book model", () => {
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });
  it("should return a list of books", async () => {
    const result = await store.index();
    expect(result).toEqual([]);
  });
});
