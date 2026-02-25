package com.internship.portal.config;

import com.internship.portal.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(request -> {
                var corsConfig = new org.springframework.web.cors.CorsConfiguration();
                corsConfig.addAllowedOrigin("http://localhost:3000");
                corsConfig.addAllowedOrigin("http://localhost:5173");
                corsConfig.addAllowedMethod("*");
                corsConfig.addAllowedHeader("*");
                corsConfig.setAllowCredentials(true);
                return corsConfig;
            }))
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                // Public endpoints
                .requestMatchers(HttpMethod.POST, "/login", "/signup").permitAll()
                .requestMatchers(HttpMethod.GET, "/").permitAll()
                .requestMatchers(HttpMethod.GET, "/supervisor/data").permitAll()
                .requestMatchers(HttpMethod.GET, "/company/data").permitAll()

                // Student endpoints
                .requestMatchers(HttpMethod.GET, "/student/data")
                    .hasAnyRole("SUPERVISOR", "STUDENT", "COMPANY")
                .requestMatchers(HttpMethod.POST, "/student/data")
                    .hasAnyRole("SUPERVISOR", "STUDENT")
                .requestMatchers(HttpMethod.PUT, "/student/data/**")
                    .hasAnyRole("SUPERVISOR", "STUDENT")
                .requestMatchers(HttpMethod.DELETE, "/student/data/**")
                    .hasRole("SUPERVISOR")
                .requestMatchers(HttpMethod.GET, "/student/**")
                    .hasRole("SUPERVISOR")

                // Company endpoints
                .requestMatchers(HttpMethod.POST, "/company/data")
                    .hasRole("COMPANY")
                .requestMatchers(HttpMethod.PUT, "/company/data/**")
                    .hasRole("COMPANY")
                .requestMatchers(HttpMethod.DELETE, "/company/data/**")
                    .hasAnyRole("SUPERVISOR", "COMPANY")

                // Supervisor endpoints
                .requestMatchers(HttpMethod.POST, "/supervisor/data")
                    .hasRole("SUPERVISOR")
                .requestMatchers(HttpMethod.PUT, "/supervisor/data/**")
                    .hasRole("SUPERVISOR")
                .requestMatchers(HttpMethod.DELETE, "/supervisor/data/**")
                    .hasRole("SUPERVISOR")

                // Internship endpoints
                .requestMatchers(HttpMethod.GET, "/internship/data")
                    .hasAnyRole("SUPERVISOR", "STUDENT", "COMPANY")
                .requestMatchers(HttpMethod.POST, "/internship/data")
                    .hasRole("COMPANY")
                .requestMatchers(HttpMethod.PUT, "/internship/data/**")
                    .hasAnyRole("SUPERVISOR", "STUDENT", "COMPANY")
                .requestMatchers(HttpMethod.DELETE, "/internship/data/**")
                    .hasRole("COMPANY")
                .requestMatchers(HttpMethod.PUT, "/internship/**")
                    .hasRole("COMPANY")
                .requestMatchers(HttpMethod.GET, "/internship/**")
                    .hasRole("COMPANY")

                // Application endpoints
                .requestMatchers(HttpMethod.GET, "/application/data")
                    .hasAnyRole("SUPERVISOR", "STUDENT", "COMPANY")
                .requestMatchers(HttpMethod.GET, "/application/data/**")
                    .hasAnyRole("SUPERVISOR", "STUDENT", "COMPANY")
                .requestMatchers(HttpMethod.PUT, "/application/data/**")
                    .hasAnyRole("SUPERVISOR", "STUDENT", "COMPANY")
                .requestMatchers(HttpMethod.DELETE, "/application/data/**")
                    .hasAnyRole("SUPERVISOR", "STUDENT", "COMPANY")
                .requestMatchers(HttpMethod.POST, "/application/create")
                    .hasRole("STUDENT")
                .requestMatchers(HttpMethod.GET, "/application/**")
                    .hasAnyRole("SUPERVISOR", "STUDENT", "COMPANY")

                // Skill endpoints
                .requestMatchers(HttpMethod.GET, "/skill/data")
                    .hasAnyRole("SUPERVISOR", "STUDENT", "COMPANY")
                .requestMatchers(HttpMethod.GET, "/skills/**")
                    .hasAnyRole("SUPERVISOR", "STUDENT", "COMPANY")
                .requestMatchers(HttpMethod.POST, "/skill/data")
                    .hasAnyRole("SUPERVISOR", "STUDENT")
                .requestMatchers(HttpMethod.PUT, "/skill/data/**")
                    .hasAnyRole("SUPERVISOR", "STUDENT")
                .requestMatchers(HttpMethod.DELETE, "/skill/data/**")
                    .hasAnyRole("SUPERVISOR", "STUDENT")

                // Hash password endpoints
                .requestMatchers(HttpMethod.POST, "/student/hash-passwords").permitAll()
                .requestMatchers(HttpMethod.POST, "/supervisor/hash-passwords").permitAll()
                .requestMatchers(HttpMethod.POST, "/company/hash-passwords").permitAll()

                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}