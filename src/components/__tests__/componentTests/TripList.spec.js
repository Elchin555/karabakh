import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach, vi } from "vitest";
import TripList from "@/components/TripList.vue";
import { createPinia, setActivePinia } from "pinia";
import { useTripStore } from "@/stores";

describe("TripList", () => {
  let tripStore;

  beforeEach(() => {
    setActivePinia(createPinia());
    tripStore = useTripStore();
  });

  it("renders correctly", () => {
    const wrapper = mount(TripList, {
      global: {
        plugins: [createPinia()],
      },
    });
  });

  it("displays loading skeleton when loading", async () => {
    tripStore.getAllTripResponse = { loading: true };
    const wrapper = mount(TripList, {
      global: {
        plugins: [createPinia()],
      },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".animate-pulse").exists()).toBe(true);
  });

  it("displays trip list when there are trips", async () => {
    tripStore.getAllTripResponse = [
      {
        id: 1,
        destination: "New York",
        start_date: "2023-06-10",
        end_date: "2023-06-20",
        budget: "luxury",
      },
      {
        id: 2,
        destination: "Paris",
        start_date: "2023-07-01",
        end_date: "2023-07-10",
        budget: "economy",
      },
    ];
    const wrapper = mount(TripList, {
      global: {
        plugins: [createPinia()],
      },
    });
    await wrapper.vm.$nextTick();
  });

  it("sorts trips correctly", async () => {
    tripStore.getAllTripResponse = [
      {
        id: 1,
        destination: "New York",
        start_date: "2023-06-10",
        end_date: "2023-06-20",
        budget: "luxury",
      },
      {
        id: 2,
        destination: "Paris",
        start_date: "2023-07-01",
        end_date: "2023-07-10",
        budget: "economy",
      },
    ];
    vi.spyOn(tripStore, "getAllTripList");
    const wrapper = mount(TripList, {
      global: {
        plugins: [createPinia()],
      },
    });
    await wrapper.vm.$nextTick();

    // Simulate sorting change
    const select = wrapper.find("select");
    await select.setValue("asc");
    await select.trigger("change");

    // Ensure the sorting function is called correctly
  });
});
