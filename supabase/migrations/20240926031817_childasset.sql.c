create table
  public.childassets (
    id bigint generated by default as identity not null,
    created_at timestamp with time zone not null default now(),
    title character varying not null,
    thumbnail character varying not null,
    mainmedia character varying not null,
    mainfile character varying not null,
    description character varying not null,
    units character varying not null,
    collection_id bigint null,
    parent_payload_id bigint not null,
    author uuid null,
    links_new jsonb not null default '[]'::jsonb,
    files_new jsonb not null default '[]'::jsonb,
    additional_media_new jsonb not null default '[]'::jsonb,
    constraint childassets_pkey primary key (id),
    constraint fk_collection foreign key (collection_id) references collections (id) on delete set null,
    constraint fk_parent_payload foreign key (parent_payload_id) references parentpayloads (id) on delete cascade,
    constraint childassets_author_fkey foreign key (author) references profiles (id),
    constraint childassets_links_new_check check ((jsonb_typeof(links_new) = 'array'::text)),
    constraint childassets_files_new_check check ((jsonb_typeof(files_new) = 'array'::text)),
    constraint childassets_additional_media_new_check check (
      (
        jsonb_typeof(additional_media_new) = 'array'::text
      )
    )
) tablespace pg_default;