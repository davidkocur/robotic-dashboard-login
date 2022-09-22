import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import SignIn from "./SignIn";

describe("email & password validation tests", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("should contain email & password", () => {
    const signIn = render(<SignIn />);
    const emailNode = signIn.getByLabelText(/Email/i);
    const passwordNode = signIn.getByLabelText(/Password/i);
    expect(emailNode).toBeInTheDocument();
    expect(passwordNode).toBeInTheDocument();
  });

  test("should validate corretly", async () => {
    let signIn;
    act(() => (signIn = render(<SignIn />)));
    const { getByLabelText } = signIn;
    const emailNode = getByLabelText(/Email/i);
    const passwordNode = getByLabelText(/Password/i);

    act(() => {
      // Focus & blur the textfields, to trigger isTouched state.
      fireEvent.focus(emailNode);
      fireEvent.blur(emailNode);
      fireEvent.focus(passwordNode);
      fireEvent.blur(passwordNode);

      fireEvent.input(emailNode, { target: { value: "my.bad@email" } });
      fireEvent.input(passwordNode, { target: { value: "goodPass1" } });
    });

    await new Promise((res) => setTimeout(res, 1000));

    const emailErrorNode = emailNode.parentElement.querySelector(
      "p[data-testid='textfield-error']"
    );
    const passwordErrorNode = passwordNode.parentElement.querySelector(
      "p[data-testid='textfield-error']"
    );

    expect(emailErrorNode).toHaveTextContent(/.+/g);
    expect(passwordErrorNode).not.toHaveTextContent(/\w+/g);
  });

  beforeEach;

  test("should prevent or allow submit", async () => {
    const { getByTestId, getByLabelText, findByTestId, getByDisplayValue } = render(<SignIn />);

    const theForm = getByTestId("sign-in-form");
    const spySubmit = vi.fn();
    theForm.onsubmit = spySubmit;
    const submitButton = getByTestId("submit-button");

    act(() => {
      fireEvent.click(submitButton);
    });

    const emailInput = getByLabelText(/Email/i);
    const passwordInput = getByLabelText(/Password/i);
    act(() => {
      fireEvent.input(emailInput, { target: { value: "correct@mail.com" } });
      fireEvent.input(passwordInput, { target: { value: "correctPass1" } });
    });
    const changedEmail = await waitFor(() => getByDisplayValue(/correct@mail/i));

    expect(changedEmail.value).toBe("correct@mail.com");

    act(() => {
      fireEvent.click(submitButton);
    });
    const modal = await findByTestId("alert-modal");
    expect(modal).toBeInTheDocument();
    expect(modal).toBeVisible();
    expect(spySubmit).toHaveBeenCalledTimes(1);
  });
});
