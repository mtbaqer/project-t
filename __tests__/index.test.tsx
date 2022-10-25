import { render, screen } from "@testing-library/react";
import * as useNewRoomActionsModule from "../hooks/useNewRoomActions";
import Home from "../pages";
import userEvent from "@testing-library/user-event";

describe("Home", () => {
  it("should render the generate room button", () => {
    jest.spyOn(useNewRoomActionsModule, "default").mockReturnValue({ navigateToNewRoom: jest.fn() });

    render(<Home />);

    const button = screen.getByRole("button", { name: "play button GENERATE ROOM" });

    expect(button).toBeInTheDocument();
  });

  it("should navigate to new room when generate room button is pressed", async () => {
    const mockNavigateToNewRoom = jest.fn();
    jest.spyOn(useNewRoomActionsModule, "default").mockReturnValue({ navigateToNewRoom: mockNavigateToNewRoom });

    const user = userEvent.setup();

    render(<Home />);

    const button = screen.getByRole("button", { name: "play button GENERATE ROOM" });
    await user.click(button);

    expect(mockNavigateToNewRoom).toHaveBeenCalledTimes(1);
  });
});
