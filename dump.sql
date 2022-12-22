--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    "usersId" integer NOT NULL,
    "userToken" text NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    "sessionsId" integer NOT NULL,
    "userId" integer NOT NULL,
    url text NOT NULL,
    "shortUrl" text NOT NULL,
    "visitCount" integer DEFAULT 0 NOT NULL
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    email character varying(50) NOT NULL,
    password text NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (1, 2, 'c0c5e4b1-73ab-4fa2-98d3-02dbce22fc89');
INSERT INTO public.sessions VALUES (2, 5, '272568c3-4e0e-475a-9cef-fb882e91e98b');
INSERT INTO public.sessions VALUES (3, 5, '22ebe871-bbc0-41ea-bbe0-d84fb3c46220');
INSERT INTO public.sessions VALUES (4, 7, 'c63d7a6b-2dd0-4df0-937d-54545f939c17');
INSERT INTO public.sessions VALUES (5, 2, '69f790c8-801c-405d-8ab5-b0ab9927df60');
INSERT INTO public.sessions VALUES (6, 2, 'bc1dfda5-1b3b-4a2b-823e-990903e67691');
INSERT INTO public.sessions VALUES (7, 2, '4a9f6835-ba35-4931-9521-29a607cdb6d2');
INSERT INTO public.sessions VALUES (8, 2, '377b9df5-9bd0-40fd-bec9-e791350922f7');


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (10, 1, 2, 'https://animesonehd.cc/', 'IacfqKpXwn', 3);
INSERT INTO public.urls VALUES (12, 1, 2, 'https://animesonehd.cc/', 'yNi8dkGDks', 1);
INSERT INTO public.urls VALUES (13, 1, 2, 'https://animesonehd.cc/', 'yMvtsGDQvp', 1);
INSERT INTO public.urls VALUES (15, 3, 5, 'https://animesonehd.cc/', 'rPollIaODj', 0);
INSERT INTO public.urls VALUES (18, 2, 5, 'https://...', 'jwhe8kTaxH', 0);
INSERT INTO public.urls VALUES (17, 2, 5, 'https://...', '8h9wZn9Qdm', 1);
INSERT INTO public.urls VALUES (14, 3, 5, 'https://animesonehd.cc/', 'Owf1thv8yb', 1);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (2, 'João', 'joao@driven.com.br', '$2b$10$qFHxP1zqRvFYyeZR8KTBI.1Eor7O0zBn7Wr9KIiPcA.CcDpXYX08.');
INSERT INTO public.users VALUES (4, 'João2', 'joao2@driven.com.br', '$2b$10$YQI1K92Mo/uTNa0NmJR6N.bfN9XNgGObx8NHoMJ5s/1rA2azspDYa');
INSERT INTO public.users VALUES (5, 'João3', 'joao3@driven.com.br', '$2b$10$EMrzknLF/meF4x4wv1qe1eV6x.yrqR4zDPnCjTHgg29d9KF4VILl6');
INSERT INTO public.users VALUES (6, 'João4', 'joao4@driven.com.br', '$2b$10$DcDRcjqTwY1egohKYY8EAOkTQ/FeXwzpmotGjOaaLUFRy/phWznKy');
INSERT INTO public.users VALUES (7, 'João5', 'joao5@driven.com.br', '$2b$10$3wPfcEHjAi.7293af5isuuqDKwaSsPpLosmxuPVO.9ShxQ3U3pneC');


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 8, true);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 18, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 7, true);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_name_key UNIQUE (name);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: urls urls_sessionsId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_sessionsId_fkey" FOREIGN KEY ("sessionsId") REFERENCES public.sessions(id);


--
-- Name: urls urls_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

