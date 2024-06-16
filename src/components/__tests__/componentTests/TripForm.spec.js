// tests/TripForm.spec.js
import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach } from "vitest";
import TripForm from "@/components/TripForm.vue";
import Loading from "@/components/Loading.vue";
import { createPinia, setActivePinia } from "pinia";

describe("TripForm", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("renders correctly", () => {
    const wrapper = mount(TripForm, {
      global: {
        plugins: [createPinia()],
        components: {
          Loading,
        },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it("shows validation message if destination is not provided", async () => {
    const wrapper = mount(TripForm, {
      global: {
        plugins: [createPinia()],
      },
    });
    await wrapper.find("button").trigger("click");
    expect(wrapper.find(".text-red-500").text()).toBe("Destination required");
  });
});
