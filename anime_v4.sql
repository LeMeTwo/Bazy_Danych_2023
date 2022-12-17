--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

--
-- Name: sex; Type: TYPE; Schema: public; Owner: mablewsk
--

CREATE TYPE sex AS ENUM (
    'male',
    'female',
    'other'
);


ALTER TYPE public.sex OWNER TO mablewsk;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: anime; Type: TABLE; Schema: public; Owner: mablewsk; Tablespace: 
--

CREATE TABLE anime (
    aid integer[],
    title character varying(100),
    gid integer[],
    tid integer[],
    fid integer[],
    pid integer[],
    otid integer[],
    oid integer[],
    ep_num integer,
    cid integer[]
);


ALTER TABLE public.anime OWNER TO mablewsk;

--
-- Name: character; Type: TABLE; Schema: public; Owner: mablewsk; Tablespace: 
--

CREATE TABLE "character" (
    cid integer[],
    name character varying(20),
    surname character varying(20),
    aid integer[],
    sex sex,
    age integer,
    vid integer[]
);


ALTER TABLE public."character" OWNER TO mablewsk;

--
-- Name: form; Type: TABLE; Schema: public; Owner: mablewsk; Tablespace: 
--

CREATE TABLE form (
    fid integer[],
    name character varying(40)
);


ALTER TABLE public.form OWNER TO mablewsk;

--
-- Name: genre; Type: TABLE; Schema: public; Owner: mablewsk; Tablespace: 
--

CREATE TABLE genre (
    gid integer[],
    name character varying(40)
);


ALTER TABLE public.genre OWNER TO mablewsk;

--
-- Name: origin; Type: TABLE; Schema: public; Owner: mablewsk; Tablespace: 
--

CREATE TABLE origin (
    oid integer[],
    name character varying(40)
);


ALTER TABLE public.origin OWNER TO mablewsk;

--
-- Name: other_tags; Type: TABLE; Schema: public; Owner: mablewsk; Tablespace: 
--

CREATE TABLE other_tags (
    otid integer[],
    name character varying(40)
);


ALTER TABLE public.other_tags OWNER TO mablewsk;

--
-- Name: place; Type: TABLE; Schema: public; Owner: mablewsk; Tablespace: 
--

CREATE TABLE place (
    pid integer[],
    name character varying(40)
);


ALTER TABLE public.place OWNER TO mablewsk;

--
-- Name: target; Type: TABLE; Schema: public; Owner: mablewsk; Tablespace: 
--

CREATE TABLE target (
    tid integer[],
    name character varying(40)
);


ALTER TABLE public.target OWNER TO mablewsk;

--
-- Name: voice_actor; Type: TABLE; Schema: public; Owner: mablewsk; Tablespace: 
--

CREATE TABLE voice_actor (
    vid integer[],
    name character varying(20),
    surname character varying(20),
    sex sex,
    birth date,
    home text[]
);


ALTER TABLE public.voice_actor OWNER TO mablewsk;

--
-- Data for Name: anime; Type: TABLE DATA; Schema: public; Owner: mablewsk
--

COPY anime (aid, title, gid, tid, fid, pid, otid, oid, ep_num, cid) FROM stdin;
{1}	Akame ga Kill!	{1,17,33,5,28}	{2}	{47,7,63,37,83,76,65,6,34,25,48,51,45,17,46,50}	{14,19,6}	{48,40,55,17,46}	{8}	24	{1,2,3,4,5}
{2}	No Game No Life	{17,9,5,3}	{4}	{42,4,37,24,6,34,9,53,28}	{19}	{35,21,18}	{7}	12	{6,7,8,9,10}
{3}	Eromanga-sensei	{9,33,3,6}	{2}	{42,34,77}	{24,11}	\N	{7}	12	{11,12}
{4}	Rokudenashi Majutsu Koushi to Akashic Records	{1,9,11,5,27}	{2}	{42,7,76,6,77,52,13}	\N	{53}	{7}	12	{13,14,15}
{5}	Sword Art Online	{1,17,33,11,5,6}	{2}	{81,90,63,37,76,24,65,34,43,77,48,67}	{22,11,14,18,5}	{8,15,54}	{7}	25	{16,17,18,19,20}
{6}	Darling in the FranXX	{1,33,12,21}	{2}	{39,12,63,83,14,50}	{17,18,19}	{52,2,46,14,54}	{11}	24	{21,22}
{7}	Black Bullet	{1,33,29,21}	{4}	{42,12,63,22,37,83,32,19,70}	{17,11,14}	{48,40,13,14}	{7}	13	{23,24,25}
{8}	Toradora!	{9,15,27,19}	{2}	{42,33,76,77,52,27}	{24,11,14}	{52}	{7}	25	{26,27,28,29,30}
{9}	Haiyore! Nyaruko-san	{9,27,3,16,21}	{4}	{39,77}	{24}	\N	{7}	12	{31,32,33,34}
{10}	Ishuzoku Reviewers	{9,5,3}	{2}	{16,81,85,4,37,61,24}	\N	\N	{8}	12	{35,36,37,38}
{11}	No Game No Life - Zero-	{1,33,5}	{4}	{42,3,4}	{19}	{55,54}	{7}	1	{6,7,8,9,10,39,40,41,42}
{12}	Ano Hi Mita Hana no Namae wo Bokutachi wa Mada Shiranai.	{33,14,15}	{4}	{21,76,77,27,46,31}	{24,11}	{52,2}	{11}	11	{43,44,45,46,47,48}
{13}	Sakurasou no Pet na Kanojo	{9,33,15,27,19}	{4}	{42,77,76,5,14,34,52,27,31}	{24,11,14}	{52}	{7}	24	{49,50,51,52,53,54}
{14}	Trinity Seven	{1,11,14,27,3,6}	{2}	{42,55,16,76,77,43}	{24,21}	\N	{8}	12	{55,56,57,58,59,60,61,62}
{15}	Kimetsu no Yaiba	{1,17,9,148,7}	{2}	{16,42,47,34,23,48,49,50,70}	{1,16}	{60}	{8}	26	{63,64,65,66}
{16}	Shigatsu wa Kimi no Uso	{33,15,13}	{2}	{47,5,14,77,17,27}	{24,11}	{52,61,7,54}	{8}	22	{67,68,69,70}
{17}	Gleipnir	{1,29,14,3}	{4}	{39,77,48}	\N	{61}	{8}	13	{71,72}
{18}	Gate: Jieitai Kanochi nite, Kaku Tatakaeri	{1,17,11,5,31}	{4}	{58,42,90,79,37,20,24,6,43,9,13,67,87}	{24,16,19}	{48,40,52,11,13,21}	{7}	12	{73,74,75,76,77}
{19}	Tokyo Ghoul	{1,33,29,5,8,18}	{4}	{63,20,65,77,32,2}	{24,11,14}	{48,40,17,9,61,46,47,53,14}	{8}	12	{78,79}
{20}	Plastic Memories	{33,20,21}	\N	{3,76,64,14}	{18,11,14}	{52}	{11}	13	{80,81}
{21}	Yahari Ore no Seishun Love Comedy wa Machigatteiru.	{9,33,15,27,19}	{4}	{14,34,77,52,11,27}	{11,24}	{44,25}	{7}	13	{82,83,84}
{22}	Domestic na Kanojo	{33,15,27,19}	{2}	{76,34,77,52}	{14,11,24}	{52}	{8}	12	{85,86,87}
{23}	Spy x Family	{1,9,14,15}	{2}	{22,20,48,74}	{24}	{48,58,36,46,47,54}	{8}	12	{88,89,90}
\.


--
-- Data for Name: character; Type: TABLE DATA; Schema: public; Owner: mablewsk
--

COPY "character" (cid, name, surname, aid, sex, age, vid) FROM stdin;
{1}	Akame	\N	{1}	female	\N	{1}
{2}	Mine	\N	{1}	female	\N	{3}
{3}	Leone	\N	{1}	female	\N	{4}
{4}	Lubbock	\N	{1}	male	\N	{2}
{5}	Tatsumi	\N	{1}	male	\N	{5}
{6}	Shiro	\N	{2,11}	female	11	{6}
{7}	Sora	\N	{2,11}	male	18	{2}
{8}	Stephanie	Dola	{2,11}	female	18	{7}
{9}	Jibril	\N	{2,11}	female	6407	{3}
{10}	Izuna	Hatsune	{2,11}	female	8	{8}
{11}	Masamune	Izumi	{3}	male	16	{2}
{12}	Sagiri	Izumi	{3}	female	13	{9}
{13}	Sistine	Fibel	{4}	female	15	{9}
{14}	Glenn	Radars	{4}	male	19	{5}
{15}	Rumia	Tingel	{4}	female	15	{10}
{16}	Kazuto	Kirigaya	{5}	male	16	{2}
{17}	Suguha	Kirigaya	{5}	female	16	{12}
{18}	Asuna	Yuuki	{5}	female	17	{11}
{19}	Keiko	Ayano	{5}	female	15	{13}
{20}	Rika	Shinozaki	{5}	female	\N	{14}
{21}	Zero Two	\N	{6}	female	\N	{11}
{22}	Hiro	\N	{6}	male	15	{15}
{23}	Enju	Aihara	{7}	female	10	{13}
{24}	Rentarou	Satomi	{7}	male	16	{16}
{25}	Kisara	Tendou	{7}	female	16	{17}
{26}	Taiga	Aisaka	{8}	female	17	{18}
{27}	Ryuuji	Takasu	{8}	male	17	{19}
{28}	Ami	Kawashima	{8}	female	17	{20}
{29}	Yuusaku	Kitamura	{8}	male	17	{21}
{30}	Minori	Kusheida	{8}	female	17	{17}
{31}	Nyaruko	\N	{9}	female	\N	{22}
{32}	Mahirio	Yasaka	{9}	male	\N	{20}
{33}	Cthuko	\N	{9}	female	\N	{23}
{34}	Hasta	\N	{9}	male	\N	{18}
{35}	Stunk	\N	{10}	male	\N	{19}
{36}	Zel	\N	{10}	male	200	{26}
{37}	Crimvael	\N	{10}	other	\N	{24}
{38}	Maydry	\N	{10}	female	\N	{25}
{39}	Schwi	Dola	{11}	female	211	{6}
{40}	Riku	Dola	{11}	male	18	{2}
{41}	Couronne	Dola	{11}	female	18	{7}
{42}	Azril	\N	{11}	female	26000	{17}
{43}	Meiko	Honma	{12}	female	\N	{6}
{44}	Naruko	Anjou	{12}	female	\N	{11}
{45}	Chiriko	Tsurumi	{12}	female	\N	{29}
{46}	Tetsudou	Hisakawa	{12}	male	\N	{27}
{47}	Atsumu	Matsuyuki	{12}	male	\N	{28}
{48}	Jinta	Yadomi	{12}	male	\N	{30}
{49}	Mashiro	Shiina	{13}	female	17	{6}
{50}	Sorata	Kanda	{13}	male	17	{2}
{51}	Nanami	Aoyama	{13}	female	17	{31}
{52}	Misaki	Kamiigusa	{13}	female	17	{32}
{53}	Jin	Mitaka	{13}	male	21	{28}
{54}	Ryuunoske	Akasaka	{13}	male	16	{17}
{55}	Lilith	Asami	{14}	female	17	{33}
{56}	Aiko	Fudou	{14}	female	18	{34}
{57}	Arin	Kannazuki	{14}	female	16	{35}
{58}	Arata	Kasuga	{14}	male	17	{2}
{59}	Levi	Kazama	{14}	female	17	{36}
{60}	Yui	Kurata	{14}	female	14	{37}
{61}	Lieselotte	Sherlock	{14}	female	16	{38}
{62}	Mira	Yamana	{14}	female	16	{7}
{63}	Tanjirou	Kamado	{15}	male	15	{40}
{64}	Nezuko	Kamado	{15}	female	14	{41}
{65}	Zenitsu	Agatsuma	{15}	male	16	{39}
{66}	Inosuke	Hashibira	{15}	male	15	{2}
{67}	Kousei	Arima	{16}	male	15	{40}
{68}	Kaori	Miyazono	{16}	female	15	{42}
{69}	Tsubaki	Sawabe	{16}	female	15	{36}
{70}	Ryouta	Watari	{16}	male	15	{43}
{71}	Claire	Aoki	{17}	female	\N	{38}
{72}	Shuichi	Kagaya	{17}	male	\N	{40}
{73}	Youji	Itami	{18}	male	33	{44}
{74}	Tuka Luna	Marceau	{18}	female	165	{45}
{75}	Lelei la	Lalena	{18}	female	15	{38}
{76}	Rory	Mercury	{18}	female	961	{42}
{77}	Piña	Co Lada	{18}	female	19	{11}
{78}	Ken	Kaneki	{19}	male	19	{40}
{79}	Touka	Kirishima	{19}	female	20	{1}
{80}	Isla	\N	{20}	female	9	{1}
{81}	Tsukasa	Mizugaki	{20}	male	18	{46}
{82}	Hachiman	Hikigaya	{21}	male	17	{47}
{83}	Yukino	Yukinoshita	{21}	female	17	{29}
{84}	Yui	Yuigahama	{21}	female	16	{38}
{85}	Natsuo	Fujii	{22}	male	20	{48}
{86}	Hina	Tachibana	{22}	female	23	{7}
{87}	Rui	Tachibana	{22}	female	16	{49}
{88}	Anya	Forger	{23}	female	\N	{50}
{89}	Yor	Forger	{23}	female	27	{29}
{90}	Loid	Forger	{23}	male	\N	{47}
\.


--
-- Data for Name: form; Type: TABLE DATA; Schema: public; Owner: mablewsk
--

COPY form (fid, name) FROM stdin;
{1}	Actors
{2}	Albinos
{3}	Androids
{4}	Angels
{5}	Artists
{6}	Aristocracy
{7}	Bishoujo
{8}	Bishounen
{9}	Deities
{10}	Chibi
{11}	Chuunibyou
{12}	Cyborgs
{13}	Wizards
{14}	Dandere/Kuudere
{15}	Delicacies
{16}	Demons
{17}	Dere-Dere
{18}	Detectives
{19}	Doctors
{20}	Adults
{21}	Ghosts
{22}	Children
{23}	Exorcists
{24}	Elves
{25}	GAR
{26}	Genius
{27}	Genki
{28}	Players
{29}	Gyaru
{30}	Heterochromia
{31}	Hikikomori
{32}	Hybrid
{33}	Idols
{34}	Imouto
{35}	Insects
{36}	Priests
{37}	Kemonomimi
{38}	Kitsune
{39}	Aliens
{40}	Cats
{41}	Lodgers
{42}	Loli
{43}	Magical
{44}	Mahou shoujo
{45}	Mayadere
{46}	Meganekko
{47}	Moe
{48}	Murderer
{49}	Talking animals
{50}	Youths
{51}	Mercenaries
{52}	Teachers
{53}	NEET
{54}	Necromanta
{55}	Ninja
{56}	Bodyguard
{57}	OP character
{58}	Otaku
{59}	Otouto
{60}	Pirates
{61}	Maids
{62}	Policeman
{63}	Monsters
{64}	Office workers
{65}	Criminals
{66}	Robots
{67}	Knights
{68}	Samurai
{69}	Shinigami
{70}	Orphans
{71}	Slime
{72}	Superheroes
{73}	Mermaids
{74}	Spies
{75}	Tengu
{76}	Tsundere
{77}	Students
{78}	Vampires
{79}	Witches
{80}	Werewolves
{81}	Fairies
{82}	Demon Lord
{83}	Yandere/Yangire
{84}	Youkai
{85}	Gender swap
{86}	Zombies
{87}	Soldiers
{88}	Animals
{89}	Bounty hunters
{90}	Dragons
\.


--
-- Data for Name: genre; Type: TABLE DATA; Schema: public; Owner: mablewsk
--

COPY genre (gid, name) FROM stdin;
{1}	Action
{2}	Cyberpunk
{3}	Ecchi
{4}	Experimental
{5}	Fantasy
{6}	Harem
{7}	Historical
{8}	Horror
{9}	Comedy
{10}	Criminal
{11}	Magic
{12}	Mecha
{13}	Musical
{14}	Supernatural
{15}	Slice of life
{16}	Parody
{17}	Adventure
{18}	Psychological
{19}	Romance
{20}	Romance to separate
{21}	Sci-Fi
{22}	Shoujo-ai
{23}	Shounen-ai
{24}	Space opera
{25}	Sport
{26}	Steampunk
{27}	School
{28}	Martial arts
{29}	Mystery
{30}	Thriller
{31}	Military
{32}	Madness
{33}	Drama
\.


--
-- Data for Name: origin; Type: TABLE DATA; Schema: public; Owner: mablewsk
--

COPY origin (oid, name) FROM stdin;
{1}	Anime
{2}	Computer game
{3}	Game (other)
{4}	Other
{5}	Card game
{6}	Book
{7}	Light novel
{8}	Manga
{9}	Manga 4-koma
{10}	Novel
{11}	Original series
{12}	Visual novel
{13}	Web manga
\.


--
-- Data for Name: other_tags; Type: TABLE DATA; Schema: public; Owner: mablewsk
--

COPY other_tags (otid, name) FROM stdin;
{1}	Alchemy
{2}	Amnesia
{3}	Baseball
{4}	Boxing
{5}	Buddhism
{6}	Crossdressing
{7}	Disease
{8}	Death game
{10}	Educational
{11}	Economics
{12}	Modern fantasy
{13}	Firearms
{14}	Human experimentation
{15}	Guilds
{16}	Gymnastics
{17}	Gore
{18}	High stakes game
{19}	Card game
{20}	Gambling
{21}	Isekai
{22}	Iyashikei
{23}	Cannibalism
{24}	Kendo
{25}	School club
{26}	Cycling
{27}	Basketeball
{28}	Culinary
{29}	Aviation
{30}	Mafia
{31}	Mahjong
{32}	Space-time manipulation
{33}	Christian mythology
{34}	Japanese mythology
{35}	About games
{36}	Childcare
{37}	Soccer
{38}	Trains
{39}	Time travel
{40}	Violence
{41}	Reincarnation
{42}	Agriculture
{43}	Cars
{44}	Student council
{45}	Volleyball
{46}	Conspiracy
{47}	Shooting
{48}	Superpowers
{49}	Dancing
{50}	Tattoos
{51}	Tennis
{52}	Love triangle
{53}	Hand-to-hand combat
{54}	Romantic theme
{55}	War
{56}	Car racing
{57}	Yakuza
{58}	Arranged relationship
{59}	Body swap
{60}	Revange
{61}	Bullying
{62}	Archery
{63}	Skating
{64}	Posthumous life
{9}	Sharing the body
\.


--
-- Data for Name: place; Type: TABLE DATA; Schema: public; Owner: mablewsk
--

COPY place (pid, name) FROM stdin;
{1}	Alternative Earth
{2}	North America
{3}	Housing
{4}	China
{5}	Dungeon
{6}	Dystopia
{7}	Europe
{8}	Feudal Japan
{9}	Gamelike
{10}	Medival
{11}	Japan
{12}	Cafe/Restaurant/Bar/Shop
{13}	Space
{14}	City
{15}	Ocean
{16}	Travel
{17}	Post-apocalyptic
{18}	Future
{19}	Alternative world
{20}	School for boys
{21}	School for girls
{23}	Country
{24}	Present day
{25}	Islands
{22}	In-game/VR
\.


--
-- Data for Name: target; Type: TABLE DATA; Schema: public; Owner: mablewsk
--

COPY target (tid, name) FROM stdin;
{1}	Shoujo
{2}	Shounen
{3}	Josei
{4}	Seinen
{5}	Children
\.


--
-- Data for Name: voice_actor; Type: TABLE DATA; Schema: public; Owner: mablewsk
--

COPY voice_actor (vid, name, surname, sex, birth, home) FROM stdin;
{1}	Sora	Amamiya	female	1993-08-28	{Tokyo,Japan}
{2}	Yoshitsugu	Matsuoka	male	1986-09-17	{Hokkaido,Japan}
{3}	Yukari	Tamura	female	1976-02-27	{Fukuoka,Japan}
{4}	Yuu	Asakawa	female	1975-03-20	{Tokyo,Japan}
{5}	Souma	Saitou	male	1991-04-22	{Yamanashi,Japan}
{6}	Ai	Kayano	female	1987-09-13	{Tokyo,Japan}
{7}	Youko	Hikasa	female	1985-07-16	{"Kanagawa Prefecture",Japan}
{8}	Miyuki	Sawashiro	female	1985-06-02	{Nagano,Japan}
{9}	Akane	Fujita	female	1993-01-26	{"Shizuoka Prefecture",Japan}
{10}	Yume	Miyamoto	female	1997-01-22	{"Fukuoka Prefecture",Japan}
{11}	Haruka	Tomatsu	female	1990-02-04	{Nagoya,Japan}
{12}	Ayana	Taketatsu	female	1989-06-23	{Saitama,Japan}
{13}	Rina	Hidaka	female	1994-06-15	{Chiba,Japan}
{14}	Ayahi	Takagaki	female	1985-10-25	{Tokyo,Japan}
{15}	Yuuto	Uemura	male	1993-10-23	{Saitama,Japan}
{16}	Yuuki	Kaji	male	1985-09-03	{Tokyo,Japan}
{17}	Yui	Horie	female	1976-09-20	{Tokyo,Japan}
{18}	Rie	Kugimiya	female	1979-05-30	{Osaka,Japan}
{19}	Junji	Majima	male	1978-05-13	{"Aichi Prefecture",Japan}
{20}	Eri	Kitamura	female	1987-08-16	{Tokyo,Japan}
{21}	Hirofumi	Nojima	male	1973-04-16	{Tokyo,Japan}
{22}	Kana	Asumi	female	1983-08-12	{"Fukuoka Prefecture",Japan}
{23}	Miyu	Matsuki	female	1977-09-14	{Kure,Japan}
{24}	Miyu	Tomita	female	1999-11-15	{"Saitama Prefecture",Japan}
{25}	Mao	Ichimichi	female	1992-02-01	{Osaka,Japan}
{26}	Yuusuke	Kobayashi	male	1985-03-25	{Tokyo,Japan}
{27}	Takayuki	Kondou	male	1978-06-05	{Tottori,Japan}
{28}	Takahiro	Sakurai	male	1974-06-13	{Okazaki,Japan}
{29}	Saori	Hayami	female	1991-05-29	{Tokyo,Japan}
{30}	Miyu	Irino	male	1988-02-19	{Tokyo,Japan}
{31}	Mariko	Nakatsu	female	1983-07-08	{"Osaka Prefecture",Japan}
{32}	Natsumi	Takamori	female	1987-02-14	{"Yamanashi Prefecture",Japan}
{33}	Yumi	Hara	female	1985-01-21	{Osaka,Japan}
{34}	Ryouka	Yuzuki	female	1974-01-10	{Anjo,Japan}
{35}	Aya	Uchida	female	1986-07-23	{"Gunma Prefecture",Japan}
{36}	Ayane	Sakura	female	1994-01-29	{Tokio,Japan}
{37}	Rie	Murakawa	female	1990-06-01	{Tokio,Japan}
{38}	Nao	Touyama	female	1992-03-11	{Tokio,Japan}
{39}	Hiro	Shimono	male	1980-04-21	{Tokyo,Japan}
{40}	Natsuki	Hanae	male	1991-06-26	{"Kanagawa Prefecture",Japan}
{41}	Akari	Kitou	female	1994-10-16	{Nagoya,Japan}
{42}	Risa	Taneda	female	1988-07-12	{Tokyo,Japan}
{43}	Ryouta	Oosaka	male	1986-08-02	{"Tokushima Prefecture",Japan}
{44}	Junichi	Suwabe	male	1972-03-29	{Tokyo,Japan}
{45}	Hisako	Kanemoto	female	1987-12-16	{Kurashiki,Japan}
{46}	Yasuaki	Takumi	male	1982-10-23	{"Aichi Prefecture",Japan}
{47}	Takuya	Eguchi	male	1987-05-22	{"Ibaraki Prefecture",Japan}
{48}	Taku	Yashiro	male	1983-01-06	{"Iwate Prefecture",Japan}
{49}	Maaya	Uchida	female	1989-12-27	{Tokyo,Japan}
{50}	Atsumi	Tanezaki	female	1990-09-27	{"Oita Prefecture",Japan}
\.


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

