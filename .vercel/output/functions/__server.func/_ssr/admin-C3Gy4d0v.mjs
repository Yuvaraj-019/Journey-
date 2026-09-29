import { o as __toESM } from "../_runtime.mjs";
import { t as cn } from "./gsap-client-BwarljNy.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, x as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { _ as classifyPlace, b as getRegion, g as useLocalPlaces, h as upsertLocalPlace, l as Route$10, m as deleteLocalPlace } from "./router-Bq6NahL2.mjs";
import { t as SplitHeading } from "./split-heading-DfqSvpiv.mjs";
import { n as saveMediaBlob, t as deleteMedia } from "./media-D1sBE-my.mjs";
import { t as Cover } from "./cover-qbqzXd0F.mjs";
import { t as FieldNotes } from "./field-notes-CEMbykL3.mjs";
import { t as MediaImg } from "./media-img-CXSkwC2b.mjs";
import { t as Button } from "./button-BsJ0KIrG.mjs";
import { t as lookupGazetteer } from "./gazetteer-CKSCf9Jq.mjs";
import { n as useSiteProfile, t as setSitePortrait } from "./site-store-C1MLKHfg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-C3Gy4d0v.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MAX_EDGE = 1400;
var TARGET_CHARS = 28e4;
async function compressImage(file) {
	const bitmap = await createImageBitmap(file);
	let width = bitmap.width;
	let height = bitmap.height;
	if (width > MAX_EDGE || height > MAX_EDGE) {
		const scale = Math.min(MAX_EDGE / width, MAX_EDGE / height);
		width = Math.max(1, Math.round(width * scale));
		height = Math.max(1, Math.round(height * scale));
	}
	const canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;
	const ctx = canvas.getContext("2d");
	if (!ctx) {
		bitmap.close();
		throw new Error("Could not read that photo.");
	}
	ctx.drawImage(bitmap, 0, 0, width, height);
	bitmap.close();
	let quality = .76;
	let out = canvas.toDataURL("image/jpeg", quality);
	while (out.length > TARGET_CHARS && quality > .45) {
		quality -= .08;
		out = canvas.toDataURL("image/jpeg", quality);
	}
	return out;
}
function PhotoField({ value, onChange, max = 12, label = "Photos" }) {
	const inputRef = (0, import_react.useRef)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function addFiles(files) {
		const existing = max === 1 ? [] : value;
		const room = max - existing.length;
		if (room <= 0) return toast(`Up to ${max} photographs.`);
		const batch = Array.from(files).filter((f) => f.type.startsWith("image/")).slice(0, room);
		if (!batch.length) return toast("Choose photos from this device.");
		setBusy(true);
		try {
			const next = [];
			for (const file of batch) {
				const dataUrl = await compressImage(file);
				const blob = await (await fetch(dataUrl)).blob();
				next.push(await saveMediaBlob(blob));
			}
			onChange([...existing, ...next]);
		} catch {
			toast("That photo wouldn't save. Try a smaller jpeg or png.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs uppercase tracking-[0.16em] text-muted",
			children: label
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-faint",
			children: "From this phone or computer. First one becomes the cover."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("mt-4 rounded-lg border border-dashed border-border bg-bg-elevated px-5 py-8 text-center transition-colors", busy ? "opacity-70" : "hover:border-line"),
			onDragOver: (e) => e.preventDefault(),
			onDrop: (e) => {
				e.preventDefault();
				addFiles(e.dataTransfer.files);
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-fg",
					children: busy ? "Saving…" : "Drop photos here"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-faint",
					children: "or"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "mt-3 text-xs uppercase tracking-[0.16em] text-accent hover:text-fg",
					onClick: () => inputRef.current?.click(),
					children: "Choose photos"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					ref: inputRef,
					type: "file",
					accept: "image/*",
					multiple: true,
					className: "hidden",
					onChange: (e) => {
						if (e.target.files) addFiles(e.target.files);
						e.target.value = "";
					}
				})
			]
		}),
		value.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4",
			"data-reveal-stagger": true,
			children: value.map((src, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "group relative overflow-hidden rounded-md",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaImg, {
						src,
						alt: "",
						className: "aspect-[4/5] w-full object-cover"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "absolute right-2 top-2 rounded-sm bg-bg/80 px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-fg opacity-0 transition-opacity group-hover:opacity-100",
						onClick: () => onChange(value.filter((_, n) => n !== i)),
						children: "Remove"
					}),
					i === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute bottom-2 left-2 rounded-sm bg-bg/80 px-2 py-1 text-[10px] uppercase tracking-[0.14em]",
						children: "Cover"
					}) : null
				]
			}, `${src}-${i}`))
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-2 text-xs text-faint",
			children: [
				value.length,
				"/",
				max
			]
		})
	] });
}
var MAX_VIDEOS = 8;
var MAX_FILE_BYTES = 83886080;
function VideoField({ value, onChange }) {
	const inputRef = (0, import_react.useRef)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function addFile(file) {
		if (value.length >= MAX_VIDEOS) return toast(`Up to ${MAX_VIDEOS} videos.`);
		if (!file.type.startsWith("video/")) return toast("Choose a video from this device.");
		if (file.size > MAX_FILE_BYTES) return toast("That video is larger than 80 MB. Compress it first, then add it.");
		setBusy(true);
		try {
			const id = await saveMediaBlob(file);
			onChange([...value, id]);
		} catch {
			toast("Couldn't add that video.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs uppercase tracking-[0.16em] text-muted",
			children: "Videos"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-faint",
			children: "From this device only. You can add more than one."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "mt-4 rounded-sm border border-border px-4 py-3 text-xs uppercase tracking-[0.16em] text-accent hover:text-fg",
			onClick: () => inputRef.current?.click(),
			disabled: busy,
			children: busy ? "Saving video…" : "Add video from device"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			ref: inputRef,
			type: "file",
			accept: "video/mp4,video/webm,video/quicktime,video/*",
			multiple: true,
			className: "hidden",
			onChange: (e) => {
				const files = Array.from(e.target.files ?? []);
				e.target.value = "";
				(async () => {
					for (const file of files) await addFile(file);
				})();
			}
		}),
		value.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-4 space-y-3",
			children: value.map((src, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-center justify-between gap-3 rounded-md border border-border bg-bg-elevated px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "truncate text-sm text-fg",
					children: ["Video ", i + 1]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "text-[10px] uppercase tracking-[0.14em] text-danger",
					onClick: () => onChange(value.filter((_, n) => n !== i)),
					children: "Remove"
				})]
			}, `${src}-${i}`))
		}) : null
	] });
}
async function geocodePlace(query) {
	const q = query.trim();
	if (!q) return null;
	const local = lookupGazetteer(q);
	try {
		const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(q)}&limit=1`;
		const res = await fetch(url);
		if (!res.ok) return local;
		const f = (await res.json()).features?.[0];
		const coords = f?.geometry?.coordinates;
		if (!coords || coords.length < 2) return local;
		const [lng, lat] = coords;
		if (!Number.isFinite(lat) || !Number.isFinite(lng)) return local;
		const p = f?.properties ?? {};
		return {
			lat,
			lng,
			label: [
				p.name,
				p.city,
				p.state,
				p.country
			].filter(Boolean).join(", ") || q,
			country: p.country || ""
		};
	} catch {
		return local;
	}
}
function AdminPage() {
	const { edit } = Route$10.useSearch();
	const places = useLocalPlaces();
	const current = (0, import_react.useMemo)(() => places.find((p) => p.id === edit || p.slug === edit), [places, edit]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "px-5 pb-10 pt-28 md:px-10 md:pt-36",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-[0.22em] text-muted",
						children: "Admin"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SplitHeading, {
						as: "h1",
						text: current ? "Edit this place." : "Add a place.",
						className: "font-display mt-4 text-4xl leading-[1.05] md:text-6xl"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-reveal": "load",
						className: "mt-5 max-w-xl text-base leading-relaxed text-muted",
						children: "Place name, photos and videos from this device, a short note. The pin is placed from the real location of the name you type."
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "px-5 pb-16 md:px-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-3xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomePortrait, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceForm, { initial: current }, current?.id ?? "new")]
			})
		}),
		places.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-t border-border px-5 py-16 md:px-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-3xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-[0.22em] text-muted",
					children: "Your places"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-8 space-y-4",
					children: places.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-4 rounded-lg border border-border bg-bg-elevated p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cover, {
							src: p.photos[0] ?? "",
							alt: "",
							className: "size-20 shrink-0 rounded-md",
							clip: false
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-fg",
									children: p.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 truncate text-xs text-faint",
									children: [
										p.location || p.country,
										" · ",
										p.lat.toFixed(3),
										", ",
										p.lng.toFixed(3)
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex gap-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/admin",
											search: { edit: p.id },
											className: "text-[10px] uppercase tracking-[0.14em] text-accent",
											children: "Edit"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/journeys/$slug",
											params: { slug: p.slug },
											className: "text-[10px] uppercase tracking-[0.14em] text-muted",
											children: "View"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "text-[10px] uppercase tracking-[0.14em] text-danger",
											onClick: () => {
												p.photos.concat(p.videos).forEach((id) => void deleteMedia(id));
												deleteLocalPlace(p.id);
												toast("Removed.");
											},
											children: "Delete"
										})
									]
								})
							]
						})]
					}, p.id))
				})]
			})
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-t border-border px-5 py-16 md:px-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-3xl text-sm leading-relaxed text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-[0.22em] text-fg",
						children: "After you host on Netlify"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
						className: "mt-6 list-decimal space-y-3 pl-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Open Site settings → Identity → Enable Identity. Set registration to Invite only. Invite your email." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Enable Git Gateway in the same Identity page." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
								"Then this site’s live admin is at ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-fg",
									children: "yoursite.netlify.app/admin"
								}),
								". Log in, click Places → New, upload photos and videos from your computer, publish. Netlify rebuilds the site."
							] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6",
						children: "Videos go as files, not links. Keep clips under about 80 MB so GitHub will accept them."
					})
				]
			})
		})
	] });
}
function HomePortrait() {
	const site = useSiteProfile();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-16 border-b border-border pb-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-[0.16em] text-muted",
				children: "Home portrait"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-faint",
				children: "This is the first image on the site. It is you — not a place you visited."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoField, {
					value: site.portrait ? [site.portrait] : [],
					onChange: (next) => setSitePortrait(next[0] ?? ""),
					max: 1,
					label: "Portrait"
				})
			})
		]
	});
}
function PlaceForm({ initial }) {
	const navigate = useNavigate();
	const [name, setName] = (0, import_react.useState)(initial?.name ?? "");
	const [location, setLocation] = (0, import_react.useState)(initial?.location ?? "");
	const [country, setCountry] = (0, import_react.useState)(initial?.country ?? "");
	const [description, setDescription] = (0, import_react.useState)(initial?.description ?? "");
	const [date, setDate] = (0, import_react.useState)(initial?.date ?? (/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
	const [photos, setPhotos] = (0, import_react.useState)(initial?.photos ?? []);
	const [videos, setVideos] = (0, import_react.useState)(initial?.videos ?? []);
	const [pin, setPin] = (0, import_react.useState)(initial ? {
		lat: initial.lat,
		lng: initial.lng,
		label: initial.location || initial.name
	} : null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function findPin() {
		const q = [
			name,
			location,
			country
		].filter(Boolean).join(", ");
		if (!q.trim()) return toast("Type the place name first.");
		const hit = await geocodePlace(q);
		if (!hit) return toast("Could not find that place. Add a city or region (example: Leh, Ladakh, India).");
		setPin(hit);
		if (hit.country) setCountry(hit.country);
		toast(`Pinned at ${hit.lat.toFixed(4)}, ${hit.lng.toFixed(4)}`);
	}
	async function save() {
		const placeName = name.trim();
		if (!placeName) return toast("Add the place name.");
		if (!photos.length && !videos.length) return toast("Add at least one photo or video.");
		setBusy(true);
		try {
			const hit = pin ?? await geocodePlace([
				placeName,
				location,
				country
			].filter(Boolean).join(", "));
			if (!hit) {
				toast("Need a real location to drop the pin. Add city + region, then save again.");
				return;
			}
			setPin(hit);
			if (hit.country && !country.trim()) setCountry(hit.country);
			const saved = upsertLocalPlace({
				id: initial?.id,
				slug: initial?.slug,
				name: placeName,
				location: location.trim() || hit.label,
				country: country.trim() || hit.country || "",
				description: description.trim(),
				date,
				lat: hit.lat,
				lng: hit.lng,
				photos,
				videos
			});
			toast("Saved.");
			await navigate({
				to: "/journeys/$slug",
				params: { slug: saved.slug }
			});
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "space-y-8",
		onSubmit: (e) => {
			e.preventDefault();
			save();
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs uppercase tracking-[0.16em] text-muted",
					children: "Place name"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: name,
					onChange: (e) => setName(e.target.value),
					onBlur: () => void findPin(),
					placeholder: "Leh",
					className: "mt-2 w-full rounded-md border border-border bg-bg-elevated px-4 py-3 text-sm text-fg placeholder:text-faint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs uppercase tracking-[0.16em] text-muted",
						children: "Region / city"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: location,
						onChange: (e) => setLocation(e.target.value),
						onBlur: () => void findPin(),
						placeholder: "Ladakh",
						className: "mt-2 w-full rounded-md border border-border bg-bg-elevated px-4 py-3 text-sm text-fg placeholder:text-faint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs uppercase tracking-[0.16em] text-muted",
						children: "Country"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: country,
						onChange: (e) => setCountry(e.target.value),
						onBlur: () => void findPin(),
						placeholder: "Mexico",
						className: "mt-2 w-full rounded-md border border-border bg-bg-elevated px-4 py-3 text-sm text-fg placeholder:text-faint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => void findPin(),
					className: "text-xs uppercase tracking-[0.16em] text-accent hover:text-fg",
					children: "Find on map"
				}), pin ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted",
					children: [
						"Pin ",
						pin.lat.toFixed(4),
						", ",
						pin.lng.toFixed(4),
						pin.label ? ` · ${pin.label}` : ""
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-faint",
					children: "Pin is set from the place name, not the middle of the country."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs uppercase tracking-[0.16em] text-muted",
					children: "When"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "date",
					value: date,
					onChange: (e) => setDate(e.target.value),
					className: "mt-2 w-full rounded-md border border-border bg-bg-elevated px-4 py-3 text-sm text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs uppercase tracking-[0.16em] text-muted",
						children: "Note"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-faint",
						children: "Paragraphs become paragraphs. Lines starting with - or 1. become lists."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: description,
						onChange: (e) => setDescription(e.target.value),
						rows: 8,
						placeholder: "First morning in the fort.\n\n- stone stairs at dawn\n- the city below still grey\n- tea on the terrace",
						className: "mt-2 w-full rounded-md border border-border bg-bg-elevated px-4 py-3 text-sm leading-relaxed text-fg placeholder:text-faint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
					}),
					description.trim() ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 rounded-md border border-border bg-bg px-4 py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] uppercase tracking-[0.16em] text-faint",
							children: "Preview"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldNotes, { text: description })]
					}) : null
				]
			}),
			pin ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs uppercase tracking-[0.14em] text-muted",
				children: [
					classifyPlace({
						name,
						location,
						country: country || pin.country,
						lat: pin.lat,
						lng: pin.lng
					}).continent,
					" · ",
					getRegion(classifyPlace({
						name,
						location,
						country: country || pin.country,
						lat: pin.lat,
						lng: pin.lng
					}).region)?.title
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoField, {
				value: photos,
				onChange: setPhotos
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoField, {
				value: videos,
				onChange: setVideos
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				disabled: busy,
				children: busy ? "Saving…" : "Save place"
			})
		]
	});
}
//#endregion
export { AdminPage as component };
