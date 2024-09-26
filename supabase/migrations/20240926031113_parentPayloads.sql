CREATE TABLE public.parentPayloads (
    id bigint generated by default as identity,
    created_at timestamp with time zone not null default now(),
    title character varying not null,
    thumbnail character varying not null,
    -- created_by uuid not null,
    description character varying not null,
    royalties character varying not null,
    location character varying null,
    status character varying null,
    mainFile character varying not null,
    constraint parentPayloads_pkey primary key (id)
) tablespace pg_default;

CREATE TABLE public.collections (
    id bigint generated by default as identity,
    creator uuid not null references profiles(id) on delete cascade,  -- Foreign key to profiles table
    name character varying not null,
    description character varying not null,
    cover_image character varying not null,
    constraint collections_pkey primary key (id)
) tablespace pg_default;

CREATE TABLE public.childAssets (
    id bigint generated by default as identity,
    created_at timestamp with time zone not null default now(),
    title character varying not null,
    thumbnail character varying not null,
    mainMedia character varying not null, -- can be a duplicate of thumbnail though 
    mainFile character varying not null,
    description character varying not null,
    units character varying not null,
    collection_id bigint null,
    parent_payload_id bigint not null,  -- Foreign key reference to parentPayloads
    constraint childAssets_pkey primary key (id),
    constraint fk_parent_payload foreign key (parent_payload_id) references public.parentPayloads (id) on delete cascade,
    constraint fk_collection foreign key (collection_id) references public.collections (id) on delete set null  -- Handle collection reference
) tablespace pg_default;