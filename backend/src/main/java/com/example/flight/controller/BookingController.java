package com.example.flight.controller;

import com.example.flight.model.Booking;
import com.example.flight.repository.BookingRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/flights")
public class BookingController {

    private final BookingRepository bookingRepository;

    public BookingController(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @PostMapping("/flights")
    public Booking createBooking(@RequestBody Booking booking) {
        return bookingRepository.save(booking);
    }
}
